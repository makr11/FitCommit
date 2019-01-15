import React from 'react';
// redux
import { connect } from 'react-redux';
import { requestUserProfile } from '../../store/actions/userProfileA';
import { requestUserRecordsAll } from '../../store/actions/userRecordsA';
import { submitUserForm } from '../../store/actions/usersA';
// app components
import UsersLayout from './UsersLayout';
import UserFormMain from './UserFormMain';

class MembersRegistry extends React.Component {
  state = {
    open: false,
  }

  openUserForm = () => {
    this.setState({
      open: true,
    })
  };

  closeUserForm = () => {
    this.setState({
      open: false,
    })
  };

  selectUser = (e) => {
    const id = e.currentTarget.id;
    this.props.getUser(id);
    this.props.getRecords(id);
  }

  render(){

    const { users, removeUser, submitUserForm } = this.props;
    const { open } = this.state;

    return (
      <React.Fragment>
        <UsersLayout
          users={users}
          removeUser={removeUser}
          openUserForm={this.openUserForm}
          selectUser={this.selectUser}
        />
        <UserFormMain
          open={open}
          closeUserForm={this.closeUserForm}
          submitUserForm={submitUserForm}
        />
      </React.Fragment>
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
    getUser: (id) => dispatch(requestUserProfile(id)),
    getRecords: (id) => dispatch(requestUserRecordsAll(id)),
    submitUserForm: (lead) => dispatch(submitUserForm(lead))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersRegistry);
