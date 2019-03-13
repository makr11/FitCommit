import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// app components
import AddUserForm from './AddUserForm';
import { EMAIL } from '../../assets/regex';

class AddUserFormMain extends React.Component {
  constructor(props){
    super(props);
    this.state={
      addUserForm: {
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        email: '',
      },
      addUserFormError: {
        first_name: false,
        last_name: false,
        username: false,
        password: false,
        email: false,
      },
      addUserFormErrorText: {
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        email: "",
      },
      warning: false,
      message: "",
    }
  }

  handleInput = (e) => {
    e.preventDefault()
    this.setState({
      ...this.state,
      addUserForm: {
        ...this.state.addUserForm,
        [e.target.name]: e.target.value,
      },
    });
  };

  checkSubmit = (e) => {
    e.preventDefault()
    const addUserForm = this.state.addUserForm;

    let first_name = (addUserForm.first_name==="")?true:false;
    let last_name = (addUserForm.last_name==="")?true:false;
    let username = (addUserForm.username==="")?true:false;
    let password = (addUserForm.password==="")?true:false;
    let email = (addUserForm.email==="")?true:false;
    let snackbar = false;
    let snackbar_message = "";
    let emailErrorText = "";

    if(!email){
      let rm = addUserForm.email.match(EMAIL)
      if(rm === null || rm.length>1 || addUserForm.email.length>rm[0].length){
        email = true;
        emailErrorText = "Neispravna e-mail adresa";
      }
    }; 
    
    for(let key in addUserForm){
      if(addUserForm[key] === ""){
        snackbar = true
        snackbar_message = "Potrebno je popuniti sva polja"
        break
      };
    }
    if(snackbar || email){
      this.setState({
        ...this.state,
        addUserFormError: {
          first_name: first_name,
          last_name: last_name,
          username: username,
          password: password,
          email: email,
        },
        addUserFormErrorText: {
          first_name: "",
          last_name: "",
          username: "",
          password: "",
          email: emailErrorText,
        },
        warning: snackbar,
        message: snackbar_message
      });
    }else{
      this.submit()
    }  
  };

  submit = () => {
    const lead = { ...this.state.addUserForm };
    this.props.submitUserForm(lead);
    this.props.closeUserForm();
  };

  closeUserForm = () => {
    this.setState({
      addUserForm: {
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        email: '',
      },
      addUserFormError: {
        first_name: false,
        last_name: false,
        username: false,
        password: false,
        email: false,
      },
      addUserFormErrorText: {
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        email: "",
      },
      warning: false,
      message: "",
    });
    this.props.closeUserForm()
  }

  closeWarning = () => {
    this.setState({
      ...this.state,
      warning: false,
      message: ""
    })
  }

  render() {
    const { 
      open
    } = this.props;
    const { 
      warning,
      message
    } = this.state;
    return (
      <React.Fragment>
        <AddUserForm
          addUserForm={this.state.addUserForm}
          addUserFormError={this.state.addUserFormError}
          addUserFormErrorText={this.state.addUserFormErrorText}
          open={open}
          handleInput={this.handleInput}
          submit={this.checkSubmit}
          close={this.closeUserForm}
        />  
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={warning}
          onClose={this.closeWarning}
          ContentProps={{
            'aria-describedby': 'message-id',
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
            </IconButton>,
          ]}
        />
      </React.Fragment>
    );
  }
}

export default AddUserFormMain;