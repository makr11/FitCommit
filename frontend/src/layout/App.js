import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch, withRouter } from 'react-router-dom'; 

import Navbar from './containers/Navbar';
import Sidebar from './containers/Sidebar';
import MembersRegistry from '../views/MembersRegistry/index';
import Profile from '../views/MembersRegistry/containers/Profile';
import Services from '../views/Services/index';
import Arrivals from '../views/MembersArrivals/index';

import {requestMembers, requestServices } from '../redux/actions';

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

const mapDispatchToProps = (dispatch) => {
  return{
    onRequestMembers: () => dispatch(requestMembers()),
    onRequestServices: () => dispatch(requestServices()),
  }
}

class App extends React.Component {

  componentDidMount(){
    this.props.onRequestMembers();
    this.props.onRequestServices();
  }
  
  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Navbar />
        <Sidebar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
            <Switch>
              <Route path="/registry" component={MembersRegistry} />
              <Route path="/services" component={Services} />
              <Route path="/profile" component={Profile} />
              <Route path="/services" component={Services} />
              <Route path="/arrivals" component={Arrivals}/>
            </Switch>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles)(App)));