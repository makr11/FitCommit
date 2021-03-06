import React from "react";
// redux
import { connect } from "react-redux";
import {
  requestArrivalsByDate,
  deleteArrival,
  submitFormArrival
} from "../../store/actions/arrivalsA";
import { requestUserRecordsActive } from "../../store/actions/userRecordsA";
// material ui core components
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
// arrivals components
import ArrivalsTable from "./ArrivalsTable";
import ArrivalsSelect from "./ArrivalsSelect";
// material ui icons
import CloseIcon from "@material-ui/icons/Close";
// helper functions
import { date, isEmpty } from "../../assets/js/functions.js";
// layout
import Layout from "../../layout/Layout";

class Arrivals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: date(),
      selectedUser: "",
      selectedRecord: "",
      usersOpt: [],
      recordsOpt: [],
      warning: false,
      message: ""
    };
  }

  componentDidMount() {
    this.props.requestArrivalsByDate(this.state.selectedDate);
    let usersOpt = this.props.users.map(user => {
      return { value: user, label: user.first_name + " " + user.last_name };
    });
    this.setState({ usersOpt: usersOpt });
  }

  componentDidUpdate() {
    const userRecords = this.props.userRecords;
    if (userRecords.length !== 0) {
      let records = userRecords.map(record => {
        return {
          value: record,
          label:
            record.service +
            " (" +
            record.category +
            ") (" +
            record.arrivals_left +
            ")"
        };
      });
      this.setState({ recordsOpt: records });
      this.props.requestUserRecordsActive();
    }
  }

  componentWillUnmount() {
    this.props.requestArrivalsByDate();
    this.props.requestUserRecordsActive();
  }

  selectUser = selectedUser => {
    this.setState(
      {
        ...this.state,
        selectedUser: selectedUser,
        selectedRecord: {},
        recordsOpt: []
      },
      () =>
        this.props.requestUserRecordsActive(this.state.selectedUser.value.id)
    );
  };

  selectRecord = selectedRecord => {
    this.setState({
      ...this.state,
      selectedRecord: selectedRecord
    });
  };

  setDate = e => {
    const date = e.currentTarget.value;
    this.setState(
      {
        selectedDate: date
      },
      () => this.props.requestArrivalsByDate(date)
    );
  };

  checkSubmit = e => {
    e.preventDefault();
    const selectedUser = this.state.selectedUser;
    const selectedRecord = this.state.selectedRecord;
    const arrivals = this.props.arrivals;

    if (isEmpty(selectedUser)) {
      this.setState({
        ...this.state,
        warning: true,
        message: "Izaberite člana i dostupnu uslugu"
      });
      return undefined;
    } else if (isEmpty(selectedRecord)) {
      this.setState({
        ...this.state,
        warning: true,
        message: "Izaberite dostupnu uslugu"
      });
      return undefined;
    } else if (!isEmpty(selectedUser) && !isEmpty(selectedRecord)) {
      for (let index in arrivals) {
        if (arrivals[index].userObj === selectedUser.value.id) {
          this.setState({
            ...this.state,
            warning: true,
            message: arrivals[index].user + " je već upisan/a"
          });
        }
      }
      this.submitForm(e);
    }
  };

  submitForm = e => {
    e.preventDefault();
    const selectedUser = this.state.selectedUser;
    const selectedRecord = this.state.selectedRecord;

    const user = selectedUser.value.id;
    const record = selectedRecord.value.id;
    const date = this.state.selectedDate;
    const lead = { user, record, date };
    this.props.submitFormArrival(lead);
    this.setState({
      selectedUser: "",
      selectedRecord: "",
      recordsOpt: []
    });
  };

  deleteArrival = id => {
    this.setState({
      selectedUser: {},
      selectedRecord: {},
      recordsOpt: []
    });
    let counter = 1;
    let req = false;
    for (let i in id) {
      req = counter === id.length ? true : false;
      counter += 1;
      this.props.deleteArrival(id[i], this.state.selectedDate, req);
    }
  };

  closeWarning = () => {
    this.setState({
      warning: false,
      message: ""
    });
  };

  render() {
    const { arrivals, isFetchingArrivals } = this.props;
    const {
      selectedDate,
      selectedUser,
      selectedRecord,
      usersOpt,
      recordsOpt,
      warning,
      message
    } = this.state;
    console.log(arrivals);

    return (
      <Layout>
        <Grid container spacing={8}>
          <ArrivalsSelect
            selectedDate={selectedDate}
            setDate={this.setDate}
            selectedUser={selectedUser}
            selectedRecord={selectedRecord}
            usersOpt={usersOpt}
            recordsOpt={recordsOpt}
            selectUser={this.selectUser}
            selectRecord={this.selectRecord}
            submitForm={this.checkSubmit}
          />
          <Grid item xs={12}>
            <ArrivalsTable
              arrivals={arrivals}
              isFetchingArrivals={isFetchingArrivals}
              handleDelete={this.deleteArrival}
            />
          </Grid>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={warning}
            onClose={this.closeWarning}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">{message}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.closeWarning}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </Grid>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.usersReducer.users,
    userRecords: state.userRecordsReducer.records,
    arrivals: state.arrivalsByDateReducer.arrivals,
    isFetchingArrivals: state.arrivalsByDateReducer.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestUserRecordsActive: id => dispatch(requestUserRecordsActive(id)),
    requestArrivalsByDate: date => dispatch(requestArrivalsByDate(date)),
    deleteArrival: (id, date, req) => dispatch(deleteArrival(id, date, req)),
    submitFormArrival: lead => dispatch(submitFormArrival(lead))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Arrivals);
