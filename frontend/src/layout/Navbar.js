import React from "react";
// prop types check
import PropTypes from "prop-types";
// material ui core
import { withStyles } from "@material-ui/core/styles";
// material ui core components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
// app components
import UserAvatar from "../components/UserAvatar";
// material ui icons
import MenuIcon from "@material-ui/icons/Menu";
// helper functions
import { isEmpty } from "../assets/js/functions";
// app constants
import { drawerWidth } from "../constants/appConstants";
// routes
import { sidebarRoutes, mainRoutes } from "../constants/routes";

export const styles = theme => ({
  appBar: {
    position: "fixed"
  },
  appBarToolbar: {
    marginLeft: "0px",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  avatar: {
    margin: 10
  },
  spacer: {
    width: "100%"
  }
});

function Navbar(props) {
  function title() {
    let name;
    const routes = sidebarRoutes.concat(mainRoutes);
    let user = props.user;

    routes.map((prop, key) => {
      if (prop.path === window.location.pathname) {
        name = prop.sidebarName;
      }
      return null;
    });
    if (window.location.pathname.startsWith("/profile/")) {
      if (!isEmpty(user)) {
        name = props.user.first_name + " " + props.user.last_name;
      }
    }
    return name;
  }

  const { classes, handleDrawerToggle, openUserMenu } = props;

  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar className={classes.appBarToolbar}>
        <div>
          <Typography variant="h5" color="inherit" noWrap>
            {title()}
          </Typography>
        </div>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.spacer} />
        <UserAvatar />
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
