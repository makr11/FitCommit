import React from 'react';
// app components
import FormDialog from '../../../components/FormDialog';
import AddUserForm from '../AddUserForm/AddUserForm';

class AddUserFormMain extends React.Component {
  state={
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    email: '',
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitForm = () => {
    const { first_name, last_name, username, password, email } = this.state;
    const lead = { first_name, last_name, username, password, email };
    this.props.submitFormUser(lead);
    this.props.closeFormDialog();
  };

  render() {
    const { first_name, last_name, username, password, email } = this.state;
    const { open, closeFormDialog } = this.props;
    return (
      <FormDialog
        open={open}
        close={closeFormDialog}
        submit={this.submitForm}
                
      >
        <AddUserForm
          first_name={first_name}
          last_name={last_name}
          username={username}
          password={password}
          email={email}
          handleInput={this.handleInput}
        />  
      </FormDialog> 
    );
  }
}

export default AddUserFormMain;
