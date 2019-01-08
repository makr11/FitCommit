import React from 'react';
// react router
import { Link } from 'react-router-dom';
// material ui core 
import { withStyles } from '@material-ui/core';
import { sidebar } from '../appStyle';
// material ui core components
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
// routes
import { sidebarRoutes } from '../../constants/routes';

const navigation = (
  <React.Fragment>
    <Divider/>
    <List component="nav">
      {sidebarRoutes.map((routeList, key) => {
        return(
          <Link to={routeList.path} style={{ textDecoration: 'none' }} key={key}>
            <ListItem button>
              <ListItemIcon>
                {routeList.sidebarIcon}
              </ListItemIcon>
              <ListItemText primary={routeList.sidebarName} />
            </ListItem>
          </Link>
        )
      })}
    </List> 
  </React.Fragment>
);

function Sidebar(props){
  const { classes, mobileOpen, handleDrawerToggle } = props;
  return(
    <React.Fragment>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar}/>
          {navigation}
        </Drawer>
      </Hidden>
      <Hidden smDown>  
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
        >
          <div className={classes.toolbar}/>
          {navigation}
        </Drawer>
      </Hidden>
    </React.Fragment>
  )
}


export default withStyles(sidebar)(Sidebar);
