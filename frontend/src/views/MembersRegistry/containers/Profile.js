import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {connect} from 'react-redux';

import {requestUserProfile} from '../../../redux/actions';

const mapStateToProps = state => {
  return {
      userProfile: state.userProfile.profile,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    unmountUser: () => dispatch(requestUserProfile()),
  }
}

class Profile extends React.Component {

  componentWillUnmount() {
    this.props.unmountUser()
  }
  
  render() {
    const { userProfile } = this.props
    console.log(userProfile)
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
        </Paper>
      </div>:
      <h1>Loading</h1>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);