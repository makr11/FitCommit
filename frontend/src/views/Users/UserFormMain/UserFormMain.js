import React from 'react';
// app components
import FormDialog from '../../../components/FormDialog';
import AddUserForm from '../AddUserForm/AddUserForm';

class AddUserFormMain extends React.Component {
  constructor(props){
    super(props);
    this.state={
      addUserFormData: {
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        email: '',
      }   
    }
  }

  handleInput = (e) => {
    this.setState({
      ...this.state,
      addUserFormData: {
        ...this.state.addUserFormData,
        [e.target.name]: e.target.value,
      },
    });
  };

  submitForm = () => {
    const lead = { ...this.state.addUserFormData };
    this.props.submitFormUser(lead);
    this.props.closeFormDialog();
  };

  render() {
    const { open, closeFormDialog } = this.props;
    return (
      <FormDialog
        open={open}
        close={closeFormDialog}
        submit={this.submitForm}
                
      >
        <AddUserForm
          { ...this.state.addUserFormData }
          handleInput={this.handleInput}
        />  
      </FormDialog> 
    );
  }
}

export default AddUserFormMain;
