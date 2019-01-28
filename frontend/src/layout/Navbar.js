import React from 'react';
// prop types check
import PropTypes from 'prop-types';
// material ui core
import { withStyles } from '@material-ui/core/styles';
// jss styles
import { navbar } from './appStyle'
// material ui core components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// helper functions
import { isEmpty } from '../assets/js/functions';

function Navbar(props){
  function title(){
    let name;
    let pathname = props.location.pathname;
    let user = props.user
    props.routes.map((prop, key) => {
      if (prop.path === pathname) {
        name = prop.sidebarName;
      }
      return null;
    });
    if(pathname.startsWith("/profile/")){
      if(!isEmpty(user)){
        name = props.user.first_name + " " + props.user.last_name;
      }
    }
    return name;
  }
  const { 
    classes, 
    handleDrawerToggle 
  } = props;
  
  return(
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar className={classes.appBarToolbar}>
        <Typography variant="title" color="inherit" noWrap>
          {title()}
        </Typography>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(navbar)(Navbar);
