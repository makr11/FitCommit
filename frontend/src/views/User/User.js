import React from 'react';
// redux
import {connect} from 'react-redux';
import { 
  submitFormRecord, 
  removeRecord, 
  updateFormRecord, 
} from '../../store/actions/userRecordsA';
import { requestArrivalsByRecord } from '../../store/actions/arrivalsA';
import { resetProfile } from '../../store/actions/userProfileA';
// app components
import RecordsFormMain from './RecordsFormMain';
import UserLayout from './UserLayout';
import ArrivalsList from './ArrivalsList';

class User extends React.Component {
  constructor(props){
    super(props);
    this.state={
      openSubmitRecordForm: false,
      openEditRecordForm: false,
      recordForm: {},
      openArrivalsList: false,
      recordArrivals: null,
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
    this.setState({
      openArrivalsList: true,
      recordArrivals: e.currentTarget.id,
    });
    this.props.requestArrivalsByRecord(e.currentTarget.id);
  }

  closeArrivalsList = () => {
    this.setState({
      openArrivalsList: false,
      recordArrivals: null,
    });
    this.props.requestArrivalsByRecord();
  }

  render() {
    const { 
      user, 
      records,
      services,
      submitRecord,
      updateRecord,
      arrivals,
    } = this.props;
    const {
      openSubmitRecordForm,
      openEditRecordForm,
      openArrivalsList,
      recordForm,
      recordArrivals,
    } = this.state;
    console.log("User")
    return (
      (user!==undefined && records !==undefined) ?
      <React.Fragment>
        <UserLayout
          {...this.props}
          openRecordForm={this.openRecordForm}
          closeRecordForm={this.closeRecordForm}
          openArrivalsList={this.openArrivalsList}
        />
        <RecordsFormMain 
          openSubmitRecordForm={openSubmitRecordForm}
          openEditRecordForm={openEditRecordForm}
          record={recordForm}
          user={user.id} 
          services={services}
          submitRecord={submitRecord}
          updateRecord={updateRecord}
          closeRecordForm={this.closeRecordForm}
        />
        <ArrivalsList
          open={openArrivalsList}
          close={this.closeArrivalsList}
          record={recordArrivals}
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
    submitRecord : (lead) => dispatch(submitFormRecord(lead)),
    resetProfile: () => dispatch(resetProfile()),
    removeRecord: (e) => dispatch(removeRecord(e.currentTarget.id)),
    updateRecord: (id, lead) => dispatch(updateFormRecord(id, lead)),
    requestArrivalsByRecord: (id) => dispatch(requestArrivalsByRecord(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
