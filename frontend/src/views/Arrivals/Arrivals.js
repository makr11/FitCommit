import React from 'react';
// redux
import { connect } from 'react-redux';
import { requestArrivalsByDate, deleteArrival, submitFormArrival } from '../../store/actions/arrivalsA';
import { requestUserRecordsActive, resetRecords } from '../../store/actions/userRecordsA';
// material ui core components
import Grid from '@material-ui/core/Grid';
// arrivals components
import ArrivalsTable from './ArrivalsTable/ArrivalsTable';
import ArrivalsSelect from './ArrivalsSelect/ArrivalsSelect';
// helper functions
import { date, isEmpty } from '../../assets/js/functions.js'


class Arrivals extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedDate: date(),
      selectedUser: "",
      selectedRecord: "",
      usersOpt: [],
      recordsOpt: [],
    };
  };

  componentDidMount(){
    this.props.selectArrivals(this.state.selectedDate);
    let usersOpt = this.props.users.map(user => {
      return {value: user, label: user.first_name + " " + user.last_name}
    })
    this.setState({usersOpt: usersOpt})
  };

  componentDidUpdate(){
    if(!isEmpty(this.props.userRecords)){
      let records = this.props.userRecords.records.map(record => {
        return {value: record, label: record.service + " (" + record.category + ") (" + record.arrivals_left + ")"}
      })
      this.setState({recordsOpt: records});
      this.props.resetRecords();
    }
  };

  componentWillUnmount(){
    this.props.resetRecords();
  };

  selectUser = (selectedUser) => {
    this.setState({
      ...this.state,
      selectedUser: selectedUser,
      selectedRecord: {},
      recordsOpt: [],
      },
    () => this.props.selectRecords(this.state.selectedUser.value.id)
    )
  };

  selectRecord = (selectedRecord) => {
    this.setState({
      ...this.state,
      selectedRecord: selectedRecord,
    })
  };

  handleDelete = (e) => {
    this.setState({
      selectedUser: {},
      selectedRecord: {},
      recordsOpt: [],
    })
    this.props.deleteArrival(e);
  };

  setDate = (e) => {
    const date = e.currentTarget.value;
    this.setState({
      selectedDate: date
    },
    () => this.props.selectArrivals(date))
  };

  submitForm = (e) => {
    e.preventDefault();
    if(this.state.selectedUser.length!==0){
      const user = this.state.selectedUser.value.id;
      const record = this.state.selectedRecord.value.id;
      const date = this.state.selectedDate;
      const lead = {user, record, date};
      this.props.handleSubmitForm(lead);
      this.setState({
        selectedUser: {},
        selectedRecord: {},
        recordsOpt: [],
    })
    }
  };

  render() {
    const { arrivals } = this.props;
    const { selectedDate, selectedUser, selectedRecord, usersOpt, recordsOpt } = this.state;
    return(
      <Grid container spacing={24}>
        <ArrivalsSelect
          selectedDate={selectedDate}
          setDate={this.setDate}
          selectedUser={selectedUser}
          selectedRecord={selectedRecord}
          usersOpt={usersOpt}
          recordsOpt={recordsOpt}
          selectUser={this.selectUser}
          selectRecord={this.selectRecord}
          submitForm={this.submitForm}
        />
        <Grid item xs={12}>
          <ArrivalsTable
            arrivals={arrivals}
            handleDelete={this.handleDelete}
          />
        </Grid>
      </Grid>
    )
  }
};

const mapStateToProps = state => {
  return {
    users: state.usersReducer.users,
    userRecords: state.userRecordsReducer,
    arrivals: state.arrivalsByDateReducer.arrivals,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectRecords: (id) => dispatch(requestUserRecordsActive(id)),
    resetRecords: () => dispatch(resetRecords()),
    selectArrivals: (date) => dispatch(requestArrivalsByDate(date)),
    deleteArrival: (e) => dispatch(deleteArrival(e.currentTarget.id)),
    handleSubmitForm: (lead) => dispatch(submitFormArrival(lead)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Arrivals);
