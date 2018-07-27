import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch, } from 'react-router-dom'; 

import Navbar from '../containers/Navbar';
import Sidebar from '../containers/Sidebar';
import NewMember from '../views/NewMember';
import MembersRegistry from '../views/MembersRegistry';
import Profile from '../views/Profile';
import Services from '../views/Services';

const drawerWidth = 260;

const styles = theme => ({
  root: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    width: `calc(100% - ${drawerWidth+48}px)`,
    minHeight: '100vh',
    float: 'right',
  },
  toolbar: theme.mixins.toolbar,
});

function App(props) {
  const { classes, userProfile } = props;
  console.log(userProfile);

  return (
    <div className={classes.root}>
      <Navbar />
      <Sidebar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/newmember" component={NewMember} />
          <Route path="/registry" component={MembersRegistry} />
          <Route path="/profile" component={Profile} />
          <Route path="/services" component={Services} />
        </Switch>
      </main>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);