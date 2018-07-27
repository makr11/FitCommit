import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { Link } from 'react-router-dom';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import InputIcon from '@material-ui/icons/Input';
import DashboardIcon from '@material-ui/icons/Dashboard';

const drawerWidth = 260;

const styles = theme => ({
  drawerPaper: {
    width: drawerWidth,
  },    
  toolbar: theme.mixins.toolbar,
});  

function Sidebar(props) {
    const {classes } = props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar}/>
        <Divider/>
        <List component="nav">

          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Pregled" />
            </ListItem> 
          </Link> 

          <Link to="/newmember" style={{ textDecoration: 'none' }}>
            <ListItem button>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Novi član" />
            </ListItem>
          </Link>

          <Link to="/registermember" style={{ textDecoration: 'none' }}>
            <ListItem button>
              <ListItemIcon>
                <InputIcon />
              </ListItemIcon>
              <ListItemText primary="Evidencija dolazaka" />
            </ListItem>
          </Link>

          <Link to="/registry" style={{ textDecoration: 'none' }}>
            <ListItem button>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Evidencija članova" />
            </ListItem>
          </Link> 

        </List> 
      </Drawer>
    )
};

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);