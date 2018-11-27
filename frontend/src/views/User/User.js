import React from 'react';
// redux
import {connect} from 'react-redux';
import { requestUserRecordsAll, submitFormRecord, resetRecords, removeRecord, updateFormRecord } from '../../actions/userRecordsActions';
import { resetProfile } from '../../actions/userProfileActions';
// material ui components
import Button from '@material-ui/core/Button'
// app components
import UserRecordsFormMain from './containers/UserRecordsFormMain';
import UserProfile from './containers/UserProfile';
import UserRecordsTable from './components/UserRecordsTable';

class User extends React.Component {
  constructor(props){
    super(props);
    this.state={
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
      openSubmitForm: (!index)?true:false,
      openEditForm: (index)?true:false,
      record: record,
    })
  };

  closeRecordDialog = () => {
    this.setState({
      openSubmitForm: false,
      openEditForm:false,
      record: {}
    })
  };

  render() {
    const { user, records, services, submitRecord, updateRecord, removeRecord } = this.props;
    const { openSubmitForm, openEditForm, record } = this.state;
    
    return (
      (user!==undefined) ?
      <div>
        <UserProfile
          user={user}
        />
        <Button onClick={this.openRecordDialog}>Otvori</Button>
        <UserRecordsFormMain 
          open={openSubmitForm || openEditForm}
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
