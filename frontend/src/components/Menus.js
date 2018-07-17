import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function ProfileMenu(props) {
  
  return(
    <Menu 
        getContentAnchorEl={null}
        anchorEl={props.anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={props.open}
        onClose={props.onClose}
    >
        <MenuItem >Profil</MenuItem>
        <MenuItem >Odjava</MenuItem>
    </Menu>
  )
};

function SettingsMenu(props) {
  return(
    <Menu
        getContentAnchorEl={null}
        anchorEl={props.anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={props.open}
        onClose={props.onClose}
    >
        <MenuItem >Usluge</MenuItem>
        <MenuItem >Korisnici</MenuItem>
    </Menu>    
  )
}

export { ProfileMenu, SettingsMenu }