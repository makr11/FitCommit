import React from "react";
// redux
import { connect } from "react-redux";
import {
  submitFormRecord,
  removeRecord,
  updateFormRecord
} from "../../store/actions/userRecordsA";
import { requestArrivalsByRecord } from "../../store/actions/arrivalsA";
import { requestUserRecordsAll } from "../../store/actions/userRecordsA";
import { requestUserProfile } from "../../store/actions/userProfileA";
import { editUserForm } from "../../store/actions/usersA";
// app components
import RecordsFormMain from "./RecordsFormMain";
import UserLayout from "./UserLayout";
import ArrivalsList from "./ArrivalsList";
import UserFormMain from "../Users/UserFormMain";
//layout
import Layout from "../../layout/Layout";
// helper functions
import { isEmpty } from "../../assets/js/functions";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openSubmitRecordForm: false,
      openEditRecordForm: false,
      openForm: false,
      recordForm: {},
      openArrivalsList: false,
      recordArrivals: null,
      record: {},
      anchor: null,
      id: null
    };
  }

  componentWillUnmount() {
    this.props.requestUserProfile();
    this.props.requestUserRecordsAll();
  }

  openUserForm = () => {
    this.setState({
      open: true
    });
  };

  closeUserForm = () => {
    this.setState({
      open: false
    });
  };

  openRecordForm = e => {
    const { records } = this.props;
    let index = e.currentTarget.id;
    let record = records[index];

    this.setState({
      openSubmitRecordForm: !index ? true : false,
      openEditRecordForm: index ? true : false,
      recordForm: record
    });
  };

  closeRecordForm = () => {
    this.setState({
      openSubmitRecordForm: false,
      openEditRecordForm: false,
      recordForm: {}
    });
  };

  openArrivalsList = e => {
    console.log(e.currentTarget.name);
    this.setState({
      openArrivalsList: true,
      recordArrivals: e.currentTarget.id,
      record: this.props.records[parseInt(e.currentTarget.name, 10)]
    });
    this.props.requestArrivalsByRecord(e.currentTarget.id);
  };

  closeArrivalsList = () => {
    this.setState({
      openArrivalsList: false,
      recordArrivals: null,
      record: {}
    });
  };

  openMenu = e => {
    this.setState({
      anchor: e.currentTarget,
      id: e.currentTarget.id
    });
  };

  closeMenu = () => {
    this.setState({
      anchor: null,
      id: null
    });
  };

  render() {
    const {
      user,
      records,
      services,
      submitFormRecord,
      editUserForm,
      updateFormRecord,
      arrivals
    } = this.props;
    const {
      open,
      openSubmitRecordForm,
      openEditRecordForm,
      openArrivalsList,
      recordForm,
      record,
      anchor,
      id
    } = this.state;

    return user !== undefined && records !== undefined ? (
      <Layout>
        {!isEmpty(user) ? (
          <UserLayout
            user={user}
            records={records}
            openUserForm={this.openUserForm}
            openRecordForm={this.openRecordForm}
            openArrivalsList={this.openArrivalsList}
            openMenu={this.openMenu}
            closeMenu={this.closeMenu}
            anchor={anchor}
            id={id}
          />
        ) : (
          undefined
        )}
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
        <UserFormMain
          user={user}
          openEditUser={open}
          editUserForm={editUserForm}
          closeUserForm={this.closeUserForm}
        />
        <ArrivalsList
          open={openArrivalsList}
          close={this.closeArrivalsList}
          record={record}
          arrivals={arrivals}
        />
      </Layout>
    ) : (
      <span />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userProfileReducer.profile,
    services: state.servicesReducer.services,
    records: state.userRecordsReducer.records,
    arrivals: state.arrivalsByRecordReducer.arrivals
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitFormRecord: lead => dispatch(submitFormRecord(lead)),
    editUserForm: (lead, id) => dispatch(editUserForm(lead, id)),
    requestUserProfile: () => dispatch(requestUserProfile()),
    removeRecord: e => dispatch(removeRecord(e.currentTarget.id)),
    updateFormRecord: (id, lead) => dispatch(updateFormRecord(id, lead)),
    requestArrivalsByRecord: id => dispatch(requestArrivalsByRecord(id)),
    requestUserRecordsAll: id => dispatch(requestUserRecordsAll(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
