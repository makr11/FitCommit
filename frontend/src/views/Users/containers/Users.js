import React from 'react';
// redux
import { connect } from 'react-redux';
import { requestUserProfile } from '../../../actions/userProfileActions';
import { removeUser, submitFormUser } from '../../../actions/usersActions';
// material ui core
import { withStyles } from '@material-ui/core/styles';
// material ui core components
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
// material ui icons
import AddIcon from '@material-ui/icons/Add';
// app components
import UsersTable from '../components/UsersTable';
import UserSubmitForm from '../components/UserSubmitForm';
// jss style
import { usersStyle } from '../../../assets/jss/users';

class MembersRegistry extends React.Component {
  state = {
    open: false,
    componentUpdate: true,
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.componentUpdate){
      return true
    }else{
      return false
    }
  }

  handleFormInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      componentUpdate: false
    });
  };

  setStateForm = () => {
    this.setState({
      open: true,
      title: "Upis novog člana",
      componentUpdate: true,
    })
  };

  closeFormDialog = () => {
    this.setState({
      open: false,
      componentUpdate: true,
    })
  };

  handleFormSubmit = () => {
    const { first_name, last_name, password, email } = this.state;
    const username = first_name + '.' + last_name;
    const lead = { first_name, last_name, username, password, email };
    this.props.submitFormUser(lead);
    this.setState({
      open: false,
      componentUpdate: true,
    })
  };

  render(){

    const { classes, users, selectUser, removeUser } = this.props;
    const { open, title } = this.state;

    return (
      <Paper >
        <UserSubmitForm
          handleFormInput={this.handleFormInput}
          handleFormSubmit={this.handleFormSubmit}
          open={open}
          closeFormDialog={this.closeFormDialog}
          title={title}
        />
        <UsersTable
          users={users}
          selectUser={selectUser}
          removeUser={removeUser}
        />
        <Tooltip title="Novi član">
          <Button variant="fab" color="primary" className={classes.addIcon} onClick={this.setStateForm}>
            <AddIcon />
          </Button>
        </Tooltip>
      </Paper>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.usersReducer.users,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectUser: (e) => dispatch(requestUserProfile(e.currentTarget.id)),
    removeUser: (e) => dispatch(removeUser(e.currentTarget.id)),
    submitFormUser: (lead) => dispatch(submitFormUser(lead))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)((withStyles)(usersStyle)(MembersRegistry));
