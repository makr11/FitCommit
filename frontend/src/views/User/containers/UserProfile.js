import React from 'react';
// redux
import {connect} from 'react-redux';
import { requestUserRecords, resetRecords, removeRecord, updateFormRecord } from '../../../actions/userRecordsActions';
import { resetProfile } from '../../../actions/userProfileActions';
// material ui core components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// app components
import AddRecord from './AddRecord';
import UserRecordsTable from '../components/UserRecordsTable';
import UserRecordsUpdate from '../components/UserRecordsUpdate';
// app helper functions
import { isEmpty } from '../../../assets/js/functions.js';

class Profile extends React.Component {
  state = {
    open: false,
    record: {},
  };

  componentDidUpdate(prevProps){
    if(prevProps.user!==this.props.user){
      this.props.getRecords(this.props.user.id);
    }
  };

  componentWillUnmount(){
    this.props.resetProfile();;
    this.props.resetRecords();
  };

  setRecordDialog = (e) => {
    let index = e.currentTarget.id;
    let record = this.props.records[index];
    this.setState({
      open: true,
      record: record,
      nettPrice: record.nett_price
    });
  };

  closeRecordDialog = () => {
    this.setState({
      open: false,
      record:{},
    })
  }

  render() {
    const { user, records, removeRecord, paidCheck } = this.props;
    const { open, record, nettPrice } = this.state;
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
            removeRecord={removeRecord}
            paidCheck={paidCheck}
            setRecordDialog={this.setRecordDialog}
          />
        {(!isEmpty(record))?
          <UserRecordsUpdate
            open={open}
            record={record}
            nettPrice={nettPrice}
            closeRecordDialog={this.closeRecordDialog}
          />:undefined
          }
        </Paper>
      </div>:
      <span></span>
    );
  }
}

const mapStateToProps = state => {
  return{
    user: state.userProfileReducer.profile,
    records: state.userRecordsReducer.records,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRecords: (id) => dispatch(requestUserRecords(id)),
    resetProfile: () => dispatch(resetProfile()),
    resetRecords: () => dispatch(resetRecords()),
    removeRecord: (e) => dispatch(removeRecord(e.currentTarget.id)),
    paidCheck: (id, index, paid) => dispatch(updateFormRecord(id, index, paid))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
