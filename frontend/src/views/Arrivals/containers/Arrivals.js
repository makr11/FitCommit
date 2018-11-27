import React from 'react';
// redux
import { connect } from 'react-redux';
import { requestArrivalsByDate, deleteArrival, submitFormArrival } from '../../../actions/arrivalsActions';
import { requestUserRecordsActive, resetRecords } from '../../../actions/userRecordsActions';
// material ui core components
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
// arrivals components
import UserArrivalsTable from '../components/UserArrivalsTable';
import UserArrivalsSelect from '../components/UserArrivalsSelect';
// helper functions
import { date, isEmpty } from '../../../assets/js/functions.js'

class Arrivals extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedDate: date(),
      selectedUser: '',
      selectedRecord: '',
      usersOpt: [],
      recordsOpt: [],
    };
  };

  componentDidMount(){
    this.props.selectArrivals(this.state.selectedDate);
    let options = [];
    for(let i=0; i<this.props.users.length; i++){
      options.push({value: this.props.users[i], label: this.props.users[i].first_name + " " + this.props.users[i].last_name})
    };
    this.setState({usersOpt: options})
  };

  componentDidUpdate(){
    if(!isEmpty(this.props.userRecords)){
      let records = [];
      let uRec = this.props.userRecords;
      for(let i=0; i<uRec.records.length; i++){
        records.push({value: uRec.records[i], label: uRec.records[i].service + " (" + uRec.records[i].category + ") (" + uRec.records[i].arrivals_left + ")"});
      };
      this.setState({recordsOpt: records});
      this.props.resetRecords();
    }
  };

  componentWillUnmount(){
    this.props.resetRecords();
  };

  selectUser = (selectedUser) => {
    this.setState({
      selectedUser: selectedUser,
      recordsOpt: [],
      },
    () => this.props.selectRecords(this.state.selectedUser.value.id)
    )
  };

  selectRecord = (selectedRecord) => {
    this.setState({
      selectedRecord: selectedRecord,
    })
  };

  handleDelete = (e) => {
    this.setState({
      selectedUser: '',
      selectedRecord: '',
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
    const user = this.state.selectedUser.value.id;
    const record = this.state.selectedRecord.value.id;
    const date = this.state.selectedDate;
    const lead = {user, record, date};
    this.props.handleSubmitForm(lead);
    this.setState({
      selectedUser: '',
      selectedRecord: '',
      recordsOpt: [],
    })
  };

  render() {
    const { arrivals } = this.props;
    const { selectedDate, selectedUser, selectedRecord, usersOpt, recordsOpt } = this.state;
    return(
      <Paper>
        <TextField
          id="date"
          label="Datum"
          type="date"
          defaultValue={selectedDate}
          InputLabelProps={{
          shrink: true,
          }}
          onChange={this.setDate}
        />
        <UserArrivalsSelect
          selectedUser={selectedUser}
          selectedRecord={selectedRecord}
          usersOpt={usersOpt}
          recordsOpt={recordsOpt}
          selectUser={this.selectUser}
          selectRecord={this.selectRecord}
          submitForm={this.submitForm}
        />
        <UserArrivalsTable
          arrivals={arrivals}
          handleDelete={this.handleDelete}
        />
      </Paper>
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
