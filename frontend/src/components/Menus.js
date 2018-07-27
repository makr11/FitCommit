import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

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
      <Link to="/profile" style={{ textDecoration: 'none' }}>
        <MenuItem >Profil</MenuItem>
      </Link>
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
      <Link to="/services" style={{ textDecoration: 'none' }}>
        <MenuItem >Usluge</MenuItem>
      </Link>
        <MenuItem >Korisnici</MenuItem>
    </Menu>    
  )
}

export { ProfileMenu, SettingsMenu }