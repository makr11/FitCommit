import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {connect} from 'react-redux';

import {requestUserProfile} from '../../../redux/actions';

import AddRecord from './AddRecord';

const mapStateToProps = state => {
  return {
      userProfile: state.userProfile.profile,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestUserProfile: () => dispatch(requestUserProfile()),
  }
}

class Profile extends React.Component {

  componentDidMount() {
    this.props.requestUserProfile()
  }

  componentWillUnmount() {
    this.props.requestUserProfile()
  }
  
  render() {
    const { userProfile } = this.props
    return (
      (userProfile!==undefined) ?
      <div>
        <Paper elevation={1}>
          <Typography variant="headline" component="h3">
            {userProfile.first_name}
          </Typography>
          <Typography component="p">
            {userProfile.email}
          </Typography>
          <AddRecord/>
        </Paper>
      </div>:
      <h1>Loading</h1>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);