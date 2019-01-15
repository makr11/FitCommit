import React from 'react';
// app components
import AddUserForm from './AddUserForm';

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
      }   
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
    if(addUserForm.first_name==="" && addUserForm.last_name===""){
      this.setState({
        warning: true,
        message: "Ime i prezime su obavezna polja"
      })
      return undefined
    }
  }

  submit = () => {
    const lead = { ...this.state.addUserForm };
    this.props.submitUserForm(lead);
    this.props.closeUserForm();
  };

  render() {
    const { open, closeUserForm } = this.props;
    return (
      <AddUserForm
        {...this.state.addUserForm}
        open={open}
        handleInput={this.handleInput}
        submit={this.submit}
        close={closeUserForm}
      />  
    );
  }
}

export default AddUserFormMain;
