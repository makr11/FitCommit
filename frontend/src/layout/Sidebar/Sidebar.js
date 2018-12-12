import React from 'react';
// prop types check
import PropTypes from 'prop-types';
// react router
import { Link } from 'react-router-dom';
// material ui core
import { withStyles } from '@material-ui/core/styles';
// jss styles
import { sidebarStyle } from '../../assets/jss/appLayout';
// material ui core components
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
// routes
import { sidebarRoutes } from '../../constants/routes';

class Sidebar extends React.PureComponent {

  render(){
    const { classes } = this.props;

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
      </Drawer>
    )
  }
};

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(sidebarStyle)(Sidebar);
