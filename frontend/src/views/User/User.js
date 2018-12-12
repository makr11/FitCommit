import React from 'react';
// redux
import {connect} from 'react-redux';
import { requestUserRecordsAll, submitFormRecord, resetRecords, removeRecord, updateFormRecord } from '../../store/actions/userRecordsA';
import { resetProfile } from '../../store/actions/userProfileA';
// material ui components
import Button from '@material-ui/core/Button'
// app components
import UserRecordsFormMain from './UserRecordsFormMain/UserRecordsFormMain';
import UserProfile from './UserProfile/UserProfile';
import UserRecordsTable from './UserRecordsTable/UserRecordsTable';

class User extends React.Component {
  constructor(props){
    super(props);
    this.state={
      opened: false,
      openSubmitForm: false,
      openEditForm:false,
      record: {},
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.user!==this.props.user){
      this.props.getRecords(this.props.user.id);
    }
  };

  componentWillUnmount(){
    this.props.resetProfile();;
    this.props.resetRecords();
  };

  openRecordDialog = (e) => {
    const { records } = this.props;
    let index = e.currentTarget.id;
    let record = records[index];
    
    this.setState({
      opened: true,
      openSubmitForm: (!index)?true:false,
      openEditForm: (index)?true:false,
      record: record,
    })
  };

  closeRecordDialog = () => {
    this.setState({
      opened: false,
      record: {}
    });
  };

  render() {
    const { user, records, services, submitRecord, updateRecord, removeRecord } = this.props;
    const { opened, openSubmitForm, openEditForm, record } = this.state;
    
    return (
      (user!==undefined) ?
      <div>
        <UserProfile
          user={user}
        />
        <Button onClick={this.openRecordDialog}>Otvori</Button>
        <UserRecordsFormMain 
          open={opened}
          openSubmitForm={openSubmitForm}
          openEditForm={openEditForm} 
          user={user.id} 
          services={services}
          record={record}
          submitRecord={submitRecord}
          updateRecord={updateRecord}
          closeFormDialog={this.closeRecordDialog}/>
        <UserRecordsTable
          records={records}
          removeRecord={removeRecord}
          openRecordDialog={this.openRecordDialog}
        />
      </div>:<span></span>
    );
  }
}

const mapStateToProps = state => {
  return{
    user: state.userProfileReducer.profile,
    services: state.servicesReducer.services,
    records: state.userRecordsReducer.records,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRecords: (id) => dispatch(requestUserRecordsAll(id)),
    submitRecord : (lead) => dispatch(submitFormRecord(lead)),
    resetProfile: () => dispatch(resetProfile()),
    resetRecords: () => dispatch(resetRecords()),
    removeRecord: (e) => dispatch(removeRecord(e.currentTarget.id)),
    updateRecord: (id, lead) => dispatch(updateFormRecord(id, lead))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
