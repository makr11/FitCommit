import React from "react";
// redux
import { connect } from "react-redux";
import { logout } from "../store/actions/authenticationA";
// material ui core components
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// material ui core
import { withStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";

const styles = {
  orangeAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepOrange[500],
    position: "relative"
  }
};

class UserAvatar extends React.Component {
  state = {
    anchorEl: null
  };

  openUserMenu = e => {
    this.setState({
      anchorEl: e.currentTarget
    });
  };

  closeUserMenu = () => {
    this.setState({
      anchorEl: null
    });
  };

  logout = () => {
    this.closeUserMenu();
    this.props.logout();
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    return (
      <React.Fragment>
        <Avatar className={classes.orangeAvatar} onClick={this.openUserMenu}>
          N
        </Avatar>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.closeUserMenu}
        >
          <MenuItem onClick={this.closeUserMenu}>Profile</MenuItem>
          <MenuItem onClick={this.logout}>Logout</MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(UserAvatar));
