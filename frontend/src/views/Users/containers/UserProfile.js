import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {connect} from 'react-redux';

import AddRecord from './AddRecord';
import ListUserRecords from './ListUserRecords';

import { requestUserRecords, reset } from '../../../redux/actions'

const mapDispatchToProps = (dispatch) => {
  return {
      getRecords: (id) => dispatch(requestUserRecords(id)),
      resetProfile: () => dispatch(reset('profile')),
      resetRecords: () => dispatch(reset('records')),
  }
};

class Profile extends React.Component {

  componentDidUpdate(prevProps){
    if(prevProps.user!==this.props.user){
      this.props.getRecords(this.props.user.id);
    }
  };

  componentWillUnmount(){
    this.props.resetProfile();;
    this.props.resetRecords();
  };
  
  render() {
    const { user } = this.props
    return (
      (user!==undefined) ?
      <div>
        <Paper elevation={1}>
          <Typography variant="headline" component="h3">
            {user.first_name}
          </Typography>
          <Typography component="p">
            {user.email}
          </Typography>
          <AddRecord user={user.id}/>
          <ListUserRecords />
        </Paper>
      </div>:
      <span></span>
    );
  }
}

export default connect(null, mapDispatchToProps)(Profile);