import React from 'react';
// prop types check
import PropTypes from 'prop-types';
// material ui core
import { withStyles } from '@material-ui/core/styles';
// jss styles
import { navbar } from '../appStyle'
// material ui core components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

function Navbar(props){

  const { classes, handleDrawerToggle } = props;

  return(
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar>
        <Typography variant="title" color="inherit" noWrap>
          Spartacus
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
