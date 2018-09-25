import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch, withRouter } from 'react-router-dom'; 

import Navbar from './containers/Navbar';
import Sidebar from './containers/Sidebar';
import Users from '../views/Users/Users';
import Profile from '../views/Users/containers/UserProfile';
import Services from '../views/Services/Services';
import Arrivals from '../views/Arrivals/Arrivals';

import {requestUsers, requestServices } from '../redux/actions';

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

const mapStateToProps = state => {
  return {
      userProfile: state.userProfileReducer.profile,
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    getUsers: () => dispatch(requestUsers()),
    getServices: () => dispatch(requestServices()),
  }
}

class App extends React.Component {

  componentDidMount(){
    this.props.getUsers();
    this.props.getServices();
  }
  
  render(){
    const { classes, userProfile } = this.props;
    return (
      <div className={classes.root}>
        <Navbar />
        <Sidebar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
            <Switch>
              <Route path="/registry" component={Users} />
              <Route path="/services" component={Services} />
              <Route path="/profile" render={() => <Profile user={userProfile}/>} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App)));