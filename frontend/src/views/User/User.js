import React from 'react';
// redux
import {connect} from 'react-redux';
import { requestUserRecordsAll, submitFormRecord, resetRecords, removeRecord, updateFormRecord } from '../../store/actions/userRecordsA';
import { resetProfile } from '../../store/actions/userProfileA';
// material ui core
import { withStyles } from '@material-ui/core';
// styles
import { user } from './userStyle';
// material ui components
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// app components
import RecordsFormMain from './RecordsFormMain/RecordsFormMain';
import Profile from './Profile/Profile';
import RecordsTable from './RecordsTable/RecordsTable';

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
    this.props.resetProfile();
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
    const { classes, user, records, services, submitRecord, updateRecord, removeRecord } = this.props;
    const { opened, openSubmitForm, openEditForm, record } = this.state;
    
    return (
      (user!==undefined) ?
      <div>
        <Profile
          user={user}
        />
        <RecordsFormMain 
          open={opened}
          openSubmitForm={openSubmitForm}
          openEditForm={openEditForm} 
          user={user.id} 
          services={services}
          record={record}
          submitRecord={submitRecord}
          updateRecord={updateRecord}
          closeFormDialog={this.closeRecordDialog}/>
        <RecordsTable
          records={records}
          removeRecord={removeRecord}
          openRecordDialog={this.openRecordDialog}
        />
        <Tooltip title="Nova usluga">
          <Fab color="primary" className={classes.addIcon} onClick={this.openRecordDialog}>
            <AddIcon />
          </Fab>
        </Tooltip>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(user)(User));
