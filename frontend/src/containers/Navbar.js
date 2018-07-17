import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

import { ProfileMenu, SettingsMenu } from '../components/Menus';

const styles = theme => ({
  appBar: {
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbarButtons: {
    marginLeft: 'auto',
  }
});

class Navbar extends React.Component {
  state = {
    anchorEl: null,
    settingsMenu: false,
    profileMenu: false
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
    switch (event.currentTarget.id){
      case 'settings-menu':
        this.setState({ settingsMenu: true });
        break;
      case 'profile-menu':
        this.setState({ profileMenu: true });
        break;
      default:
        break 
    }
  };

  handleClose = () => {
    this.setState({ 
      anchorEl: null,
      settingsMenu: false,
      profileMenu: false
    });

  };

  render() {
  const { classes } = this.props;
  const { anchorEl, settingsMenu, profileMenu } = this.state;
    
    return(
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap>
            Spartacus
          </Typography>
          <div className={classes.toolbarButtons}>
            <IconButton 
              color="inherit"
            >
              <AccountBalanceIcon/>
            </IconButton> 
            <IconButton 
              id='settings-menu'
              color="inherit"
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <SettingsIcon/>
            </IconButton> 
            <SettingsMenu
              anchorEl={anchorEl}
              open={settingsMenu}
              onClose={this.handleClose}
            /> 
            <IconButton 
              id='profile-menu'
              color="inherit"
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <AccountCircleIcon/>
            </IconButton>
            <ProfileMenu
              anchorEl={anchorEl}
              open={profileMenu}
              onClose={this.handleClose}
            />  
          </div>  
        </Toolbar>  
      </AppBar>
    )
  }  
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);