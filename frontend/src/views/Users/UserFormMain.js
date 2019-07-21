import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
// app components
import AddUserForm from "./AddUserForm";
import { EMAIL } from "../../assets/regex";
import { emptyFields } from "../../assets/js/formDataValidation";
import { isEmpty } from "../../assets/js/functions";
// helper functions
import { date, dateFormat } from "../../assets/js/functions.js";
// Hashing
/*import bcrypt from "bcrypt";*/

class UserFormMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userForm: {
        first_name: "",
        last_name: "",
        phone: "",
        birth_date: date(),
        address: "",
        city: "",
        email: ""
      },
      userFormError: {
        first_name: false,
        last_name: false,
        phone: false,
        birth_date: false,
        address: false,
        city: false,
        email: false
      },
      userFormErrorText: {
        first_name: "",
        last_name: "",
        phone: "",
        birth_date: "",
        address: "",
        city: "",
        email: ""
      },
      warning: false,
      message: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (isEmpty(prevProps.user) && !isEmpty(this.props.user)) {
      const { user } = this.props;
      this.setState({
        ...this.state,
        userForm: {
          first_name: user.first_name,
          last_name: user.last_name,
          phone: user.phone,
          birth_date: user.birth_date,
          address: user.address,
          city: user.city,
          email: user.email
        }
      });
    }
  }

  handleUserInput = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      userForm: {
        ...this.state.userForm,
        [e.target.name]: e.target.value
      }
    });
  };

  checkSubmit = e => {
    e.preventDefault();

    let snackbar_message = "Potrebno je popuniti sva polja";
    let emailErrorText = "Neispravna e-mail adresa";
    let validate = emptyFields(this.state.userForm);

    if (!validate["objEmptyFields"]["email"]) {
      let rm = this.state.userForm.email.match(EMAIL);
      if (
        rm === null ||
        rm.length > 1 ||
        this.state.userForm.email.length > rm[0].length
      ) {
        validate["objEmptyFields"]["email"] = true;
      }
    }

    if (validate["hasEmptyFields"] || validate["objEmptyFields"]["email"]) {
      this.setState({
        ...this.state,
        userFormError: {
          ...validate["objEmptyFields"]
        },
        userFormErrorText: {
          first_name: "",
          last_name: "",
          phone: "",
          birth_date: "",
          address: "",
          city: "",
          email: validate["objEmptyFields"]["email"] ? emailErrorText : ""
        },
        warning: validate["hasEmptyFields"],
        message: validate["hasEmptyFields"] ? snackbar_message : ""
      });
    } else {
      this.submit();
    }
  };

  submit = () => {
    const lead = { ...this.state.userForm };
    if (this.props.user !== undefined) {
      this.props.editUserForm(lead, this.props.user.id);
    } else {
      this.props.submitUserForm(lead);
    }
    this.props.closeUserForm();
  };

  closeUserForm = () => {
    this.setState({
      userForm: this.props.user
        ? {
            first_name: this.props.user.first_name,
            last_name: this.props.user.last_name,
            phone: this.props.user.phone,
            birth_date: dateFormat(this.props.user.birth_date),
            address: this.props.user.address,
            city: this.props.user.city,
            email: this.props.user.email
          }
        : {
            first_name: "",
            last_name: "",
            phone: "",
            birth_date: date(),
            address: "",
            city: "",
            email: ""
          },
      userFormError: {
        first_name: false,
        last_name: false,
        phone: false,
        birth_date: false,
        address: false,
        city: false,
        email: false
      },
      userFormErrorText: {
        first_name: "",
        last_name: "",
        phone: "",
        birth_date: "",
        address: "",
        city: "",
        email: ""
      },
      warning: false,
      message: ""
    });
    this.props.closeUserForm();
  };

  closeWarning = () => {
    this.setState({
      ...this.state,
      warning: false,
      message: ""
    });
  };

  render() {
    const { openAddUser, openEditUser } = this.props;
    const { warning, message } = this.state;

    return (
      <React.Fragment>
        <AddUserForm
          userForm={this.state.userForm}
          userFormError={this.state.userFormError}
          userFormErrorText={this.state.userFormErrorText}
          open={
            openAddUser !== undefined
              ? openAddUser
              : openEditUser !== undefined
              ? openEditUser
              : false
          }
          handleInput={this.handleUserInput}
          submit={this.checkSubmit}
          close={this.closeUserForm}
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

export default UserFormMain;
