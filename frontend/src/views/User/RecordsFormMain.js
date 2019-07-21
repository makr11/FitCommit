import React from "react";
// material ui components
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
// app components
import EditRecord from "./EditRecord";
import AddRecord from "./AddRecord";
// app helper functions
import {
  isEmpty,
  date,
  dateDiff,
  addToDate,
  dateFormat
} from "../../assets/js/functions";
import {
  emptyFields,
  handleDiscount
} from "../../assets/js/formDataValidation";

class RecordsFormMain extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      addRecord: {
        service: {},
        categories: [],
        category: {},
        options: [],
        option: {},
        price: "",
        discount: "",
        nett_price: "",
        paid: false
      },
      addRecordError: {
        service: false,
        category: false,
        option: false,
        price: false,
        discount: false,
        nett_price: false
      },
      editRecord: {},
      warning: false,
      message: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (isEmpty(prevProps.record) && !isEmpty(this.props.record)) {
      const { record } = this.props;
      let started = dateFormat(record.started);
      let ends = dateFormat(record.ends);
      this.setState({
        ...this.state,
        editRecord: {
          started: started,
          ends: ends,
          freeze: record.freeze_ended !== null ? true : false,
          freeze_started: record.freeze_started
            ? record.freeze_started
            : date(),
          freezeDays: record.freeze_min,
          freeze_ended: record.freeze_ended
            ? record.freeze_ended
            : addToDate(date(), record.freeze_min),
          discount: record.discount,
          nett_price: record.nett_price,
          paid: record.paid
        }
      });
    }
  }

  handleSelectService = e => {
    const { services } = this.props;
    let name = e.target.name;
    let value = e.target.value;
    let addRecord = this.state.addRecord;

    switch (name) {
      case "service":
        let service = services.filter(service => {
          return service.service === e.target.value;
        });
        this.setState({
          ...this.state,
          addRecord: {
            ...addRecord,
            service: service[0],
            categories: service[0].categories,
            category: {},
            options: [],
            option: {},
            price: "",
            discount: "",
            nett_price: "",
            paid: false
          }
        });
        break;
      case "category":
        let category = addRecord.categories.filter(category => {
          return category.category === value;
        });
        this.setState({
          ...this.state,
          addRecord: {
            ...addRecord,
            category: category[0],
            options: category[0].options,
            option: {},
            price: "",
            discount: "",
            nett_price: "",
            paid: false
          }
        });
        break;
      case "option":
        let option = addRecord.options.filter(option => {
          return option.id === parseInt(value, 10);
        });
        this.setState({
          ...this.state,
          addRecord: {
            ...addRecord,
            option: option[0],
            price: option[0].price,
            discount: 0,
            nett_price: option[0].price
          }
        });

        break;
      default:
        break;
    }
  };

  handleAddRecordInput = e => {
    let name = e.target.name;
    let value = e.target.value;
    if (value.charAt(0) !== "-") {
      if (name === "discount") {
        let d = handleDiscount(value);
        let nett_price = this.state.addRecord.price * (1 - d / 100);
        this.setState({
          ...this.state,
          addRecord: {
            ...this.state.addRecord,
            discount: d,
            nett_price: nett_price
          }
        });
      } else if (name === "paid") {
        this.setState({
          ...this.state,
          addRecord: {
            ...this.state.addRecord,
            paid: e.target.checked
          }
        });
      } else {
        this.setState({
          ...this.state,
          addRecord: {
            ...this.state.addRecord,
            [name]: value
          }
        });
      }
    }
  };

  handleCheckBox = e => {
    let name = e.target.id;
    let checked = e.target.checked;

    this.setState({
      ...this.state,
      editRecord: {
        ...this.state.editRecord,
        [name]: checked ? true : false
      }
    });
  };

  handleEditRecordInput = e => {
    let name = e.target.name;
    let value = e.target.value;
    if (value.charAt(0) !== "-") {
      if (name === "discount") {
        let d = handleDiscount(value);
        let nett_price = this.props.record.price * (1 - d / 100);
        this.setState({
          ...this.state,
          editRecord: {
            ...this.state.editRecord,
            discount: d,
            nett_price: nett_price
          }
        });
      } else if (name === "freezeDays") {
        const { record } = this.props;
        value = parseInt(value, 10);
        this.setState({
          ...this.state,
          editRecord: {
            ...this.state.editRecord,
            freezeDays: e.target.value,
            freeze_ended:
              record.freeze_min <= value
                ? addToDate(date(), value)
                : addToDate(date(), record.freeze_min)
          }
        });
      } else if (name === "freeze_ended") {
        const { record } = this.props;
        let diffDays = dateDiff(value, this.state.editRecord.freeze_started);
        if (record.freeze_min <= diffDays && diffDays <= record.freeze_max) {
          this.setState({
            ...this.state,
            editRecord: {
              ...this.state.editRecord,
              freezeDays: diffDays,
              freeze_ended: value
            }
          });
        }
      } else {
        this.setState({
          ...this.state,
          editRecord: {
            ...this.state.editRecord,
            [e.target.name]: e.target.value
          }
        });
      }
    }
  };

  checkSubmit = e => {
    e.preventDefault();

    let snackbar_message = "Potrebno je popuniti sva polja";
    let validate = emptyFields(this.state.addRecord);

    if (validate["hasEmptyFields"]) {
      this.setState({
        ...this.state,
        addRecordError: {
          ...validate["objEmptyFields"]
        },
        warning: validate["hasEmptyFields"],
        message: validate["hasEmptyFields"] ? snackbar_message : ""
      });
      return undefined;
    } else {
      this.submitRecord();
    }
  };

  submitRecord = () => {
    const { user } = this.props;
    const { price, discount, nett_price, paid } = this.state.addRecord;

    const service = this.state.addRecord.service.id;
    const category = this.state.addRecord.category.id;
    const option = this.state.addRecord.option.id;

    const lead = {
      user,
      service,
      category,
      option,
      price,
      discount,
      nett_price,
      paid
    };

    this.props.submitRecord(lead);
    this.props.closeRecordForm();
    this.setState({
      addRecord: {
        service: {},
        categories: [],
        category: {},
        options: [],
        option: {},
        price: "",
        discount: "",
        nett_price: "",
        paid: false
      },
      addRecordError: {
        service: false,
        category: false,
        option: false,
        price: false,
        discount: false,
        nett_price: false
      },
      editRecord: {},
      warning: false,
      message: ""
    });
  };

  editRecord = e => {
    e.preventDefault();
    const { record } = this.props;
    let {
      started,
      ends,
      freeze,
      freezeDays,
      freeze_started,
      freeze_ended,
      nett_price,
      discount,
      paid
    } = this.state.editRecord;

    let lead = { started, ends, discount, nett_price, paid };

    if (freeze === true) {
      ends = addToDate(
        dateFormat(record.started),
        freezeDays + record.duration
      );
      lead = { ...lead, freeze_started, freeze_ended, ends };
    } else if (record.freeze_started !== null) {
      freezeDays = dateDiff(date(), freeze_started);
      ends = addToDate(
        dateFormat(record.started),
        freezeDays + record.duration
      );
      freeze_started = null;
      freeze_ended = null;
      lead = { ...lead, freeze_started, freeze_ended, ends };
    }

    this.props.updateRecord(record.id, lead);
    this.props.closeRecordForm();
  };

  closeRecordForm = () => {
    this.setState({
      addRecord: {
        service: {},
        categories: [],
        category: {},
        options: [],
        option: {},
        price: "",
        discount: "",
        nett_price: "",
        paid: false
      },
      addRecordError: {
        service: false,
        category: false,
        option: false,
        price: false,
        discount: false,
        nett_price: false
      },
      editRecord: {},
      warning: false,
      message: ""
    });
    this.props.closeRecordForm();
  };

  closeWarning = () => {
    this.setState({
      ...this.state,
      warning: false,
      message: ""
    });
  };

  render() {
    const { openSubmitRecordForm, openEditRecordForm, services } = this.props;
    const { warning, message } = this.state;

    return (
      <React.Fragment>
        <AddRecord
          open={openSubmitRecordForm}
          close={this.closeRecordForm}
          services={services}
          handleInput={this.handleAddRecordInput}
          handleSelectService={this.handleSelectService}
          submit={this.checkSubmit}
          {...this.state.addRecord}
          addRecordError={this.state.addRecordError}
        />
        <EditRecord
          open={openEditRecordForm}
          close={this.closeRecordForm}
          handleInput={this.handleEditRecordInput}
          handleCheckBox={this.handleCheckBox}
          submit={this.editRecord}
          {...this.state.editRecord}
        />
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
      </React.Fragment>
    );
  }
}

export default RecordsFormMain;
