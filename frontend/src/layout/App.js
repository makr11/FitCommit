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
import { appStyle } from '../assets/jss/appLayout';
// app components
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';

class App extends React.Component {

  componentDidMount(){
    this.props.getUsers();
    this.props.getServices();
    this.props.getSetup();
  }

  render(){
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Navbar/>
        <Sidebar/>
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

export default withRouter(connect(null, mapDispatchToProps)(withStyles(appStyle)(App)));
