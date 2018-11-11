import React from 'react';
// prop types check
import PropTypes from 'prop-types';
// material ui core
import { withStyles } from '@material-ui/core/styles';
// jss styles
import { navbarStyle } from '../../assets/jss/appLayout'
// material ui core components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function Navbar(props){

  const { classes } = props;

  return(
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar>
        <Typography variant="title" color="inherit" noWrap>
          Spartacus
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(navbarStyle)(Navbar);
