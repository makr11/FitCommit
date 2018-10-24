import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import UserArrivalsTable from './components/UserArrivalsTable';
import UserArrivalsSelect from './components/UserArrivalsSelect';

import { requestArrivalsByDate, deleteInstance, requestUserRecords, submitFormArrival, reset } from '../../redux/actions'

const mapStateToProps = state => {
  return {
    users: state.usersReducer.users,
    userRecords: state.userRecordsReducer,
    arrivals: state.arrivalsByDateReducer.arrivals,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectRecords: (id) => dispatch(requestUserRecords(id)),
    resetRecords: () => dispatch(reset('records')),
    selectArrivals: (date) => dispatch(requestArrivalsByDate(date)),
    deleteArrivals: (e) => dispatch(deleteInstance(e.currentTarget.name, e.currentTarget.id)),
    handleSubmitForm: (lead) => dispatch(submitFormArrival(lead)),
  }
};

class Arrivals extends React.Component {
  constructor(props){
    super(props);
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    if(month<10) {
      month = '0' + month
    };
    if(day<10){
      day = '0' + date.getDate()
    };
    this.state = {
      selectedDate: year + '-' + month + '-' + day,
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
  }

  componentDidUpdate(){
    function isEmpty(obj) {
      for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
      }
      return true;
    }
    if(!isEmpty(this.props.userRecords)){
      let records = [];
      let uRec = this.props.userRecords;
      for(let i=0; i<uRec.records.length; i++){
        records.push({value: uRec.records[i], label: uRec.records[i].service + " (" + uRec.records[i].category + ") (" + uRec.records[i].arrivals_left + ")"});
      };
      this.setState({recordsOpt: records});
      this.props.resetRecords();
    }
  }

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

  deleteArrival = (e) => {
    this.setState({
      selectedUser: '',
      selectedRecord: '',
      recordsOpt: [],
    })
    this.props.deleteArrivals(e);
  }

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
        <Typography variant="title">
          Evidencija dolazaka
        </Typography>
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
          deleteArrival={this.deleteArrival}
        />
      </Paper>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Arrivals);
