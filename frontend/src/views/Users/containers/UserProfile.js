import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import AddRecord from './AddRecord';
import UserRecordsTable from '../components/UserRecordsTable';
import { requestUserRecords, reset, removeInstance, updateFormRecord } from '../../../redux/actions'

const mapStateToProps = state => {
  return{
    records: state.userRecordsReducer.records,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRecords: (id) => dispatch(requestUserRecords(id)),
    resetProfile: () => dispatch(reset('profile')),
    resetRecords: () => dispatch(reset('records')),
    removeInstance: (e) => dispatch(removeInstance(e.currentTarget.id, e.currentTarget.name)),
    paidCheck: (id, index, paid) => dispatch(updateFormRecord(id, index, paid))
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
    const { user, records, removeInstance, paidCheck } = this.props
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
          <UserRecordsTable
            records={records}
            removeInstance={removeInstance}
            paidCheck={paidCheck}
          />
        </Paper>
      </div>:
      <span></span>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
