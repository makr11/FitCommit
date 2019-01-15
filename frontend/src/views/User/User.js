import React from 'react';
// redux
import {connect} from 'react-redux';
import { submitFormRecord, removeRecord, updateFormRecord } from '../../store/actions/userRecordsA';
import { resetProfile } from '../../store/actions/userProfileA';
import RecordsFormMain from './RecordsFormMain';
import UserLayout from './UserLayout';

class User extends React.Component {
  constructor(props){
    super(props);
    this.state={
      openSubmitRecordForm: false,
      openEditRecordForm: false,
      record: {},
    }
  }

  componentWillUnmount(){
    this.props.resetProfile();
  };

  openRecordForm = (e) => {
    const { records } = this.props;
    let index = e.currentTarget.id;
    let record = records[index];
    
    this.setState({
      openSubmitRecordForm: (!index)?true:false,
      openEditRecordForm: (index)?true:false,
      record: record,
    })
  };

  closeRecordForm = () => {
    this.setState({
      openSubmitRecordForm: false,
      openEditRecordForm: false,
      record: {}
    });
  };

  render() {
    const { 
      user, 
      records,
      services,
      submitRecord,
      updateRecord,
    } = this.props
    
    return (
      (user!==undefined && records !==undefined) ?
      <React.Fragment>
        <UserLayout
          {...this.props}
          openRecordForm={this.openRecordForm}
          closeRecordForm={this.closeRecordForm}
        />
        <RecordsFormMain 
          {...this.state}
          user={user.id} 
          services={services}
          submitRecord={submitRecord}
          updateRecord={updateRecord}
          closeRecordForm={this.closeRecordForm}
        />
      </React.Fragment>:<span></span>
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
    submitRecord : (lead) => dispatch(submitFormRecord(lead)),
    resetProfile: () => dispatch(resetProfile()),
    removeRecord: (e) => dispatch(removeRecord(e.currentTarget.id)),
    updateRecord: (id, lead) => dispatch(updateFormRecord(id, lead))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
