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
// material ui core
import { withStyles } from '@material-ui/core/styles';
// jss styles
import { app } from './appStyle';
// app components
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';

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
    const { classes } = this.props;
    const { mobileOpen } = this.state;
    
    return (
      <div>
        <Navbar handleDrawerToggle={this.handleDrawerToggle}/>
        <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={this.handleDrawerToggle}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Main/>
        </main>
      </div>
    );
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

export default withRouter(connect(null, mapDispatchToProps)(withStyles(app)(App)));
