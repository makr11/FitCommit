import React from 'react';
// redux
import {connect} from 'react-redux';
import { 
  submitFormRecord, 
  removeRecord, 
  updateFormRecord, 
} from '../../store/actions/userRecordsA';
import { requestArrivalsByRecord } from '../../store/actions/arrivalsA';
import { requestUserRecordsAll } from '../../store/actions/userRecordsA';
import { requestUserProfile } from '../../store/actions/userProfileA';
// app components
import RecordsFormMain from './RecordsFormMain';
import UserLayout from './UserLayout';
import ArrivalsList from './ArrivalsList';
// helper functions
import { isEmpty } from '../../assets/js/functions';

class User extends React.Component {
  constructor(props){
    super(props);
    this.state={
      openSubmitRecordForm: false,
      openEditRecordForm: false,
      recordForm: {},
      openArrivalsList: false,
      recordArrivals: null,
      record: {}
    }
  }

  componentWillUnmount(){
    this.props.requestUserProfile();
    this.props.requestUserRecordsAll();
  };

  openRecordForm = (e) => {
    const { records } = this.props;
    let index = e.currentTarget.id;
    let record = records[index];
    
    this.setState({
      openSubmitRecordForm: (!index)?true:false,
      openEditRecordForm: (index)?true:false,
      recordForm: record,
    })
  };

  closeRecordForm = () => {
    this.setState({
      openSubmitRecordForm: false,
      openEditRecordForm: false,
      recordForm: {}
    });
  };

  openArrivalsList = (e) => {
    console.log(e.currentTarget.name)
    this.setState({
      openArrivalsList: true,
      recordArrivals: e.currentTarget.id,
      record: this.props.records[parseInt(e.currentTarget.name, 10)]
    });
    this.props.requestArrivalsByRecord(e.currentTarget.id);
  }

  closeArrivalsList = () => {
    this.setState({
      openArrivalsList: false,
      recordArrivals: null,
      record: {}
    });  
  }

  render() {
    const { 
      user, 
      records,
      services,
      submitFormRecord,
      updateFormRecord,
      arrivals,
    } = this.props;
    const {
      openSubmitRecordForm,
      openEditRecordForm,
      openArrivalsList,
      recordForm,
      record
    } = this.state;
    
    return (
      (user!==undefined && records !==undefined) ?
      <React.Fragment>
        {(!isEmpty(user))?
        <UserLayout
          user={user}
          records={records}
          openRecordForm={this.openRecordForm}
          openArrivalsList={this.openArrivalsList}
        />:undefined}
        <RecordsFormMain 
          openSubmitRecordForm={openSubmitRecordForm}
          openEditRecordForm={openEditRecordForm}
          record={recordForm}
          user={user.id} 
          services={services}
          submitRecord={submitFormRecord}
          updateRecord={updateFormRecord}
          closeRecordForm={this.closeRecordForm}
        />
        <ArrivalsList
          open={openArrivalsList}
          close={this.closeArrivalsList}
          record={record}
          arrivals={arrivals}
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
    arrivals: state.arrivalsByRecordReducer.arrivals
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitFormRecord : (lead) => dispatch(submitFormRecord(lead)),
    requestUserProfile: () => dispatch(requestUserProfile()),
    removeRecord: (e) => dispatch(removeRecord(e.currentTarget.id)),
    updateFormRecord: (id, lead) => dispatch(updateFormRecord(id, lead)),
    requestArrivalsByRecord: (id) => dispatch(requestArrivalsByRecord(id)),
    requestUserRecordsAll: (id) => dispatch(requestUserRecordsAll(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
