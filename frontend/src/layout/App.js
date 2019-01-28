import React from 'react';
// redux
import { connect } from 'react-redux';
// prop type check
import PropTypes from 'prop-types';
// redux
import { requestUsers } from '../store/actions/usersA'; 
import { requestServices } from '../store/actions/servicesA';
import { requestSetup} from '../store/actions/setupA';
// react router
import { withRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
// material ui core
import { withStyles } from '@material-ui/core/styles';
// jss styles
import { app } from './appStyle';
// app components
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Dashboard from '../views/Dashboard/Dashboard';
import { sidebarRoutes, mainRoutes } from '../constants/routes';

class App extends React.Component {
  state = {
    mobileOpen: false,
  };

  componentDidMount(){
    this.props.getUsers();
    this.props.getServices();
    this.props.getSetup();
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render(){
    const { 
      classes,
      location,
      user
    } = this.props;
    const { 
      mobileOpen
    } = this.state;
    const routes = sidebarRoutes.concat(mainRoutes);

    return (
      <div>
        <Navbar 
          handleDrawerToggle={this.handleDrawerToggle}
          routes={routes}
          location={location}
          user={user}
        />
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={this.handleDrawerToggle}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/" component={Dashboard}/>
            {routes.map((route, key) => {
              return(
                <Route path={route.path} component={route.component} key={key}/>
              )
            })}
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userProfileReducer.profile,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    getUsers: () => dispatch(requestUsers()),
    getServices: () => dispatch(requestServices()),
    getSetup: () => dispatch(requestSetup()),
  }
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(app)(App)));
