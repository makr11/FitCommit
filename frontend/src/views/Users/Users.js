import React from "react";
// redux
import { connect } from "react-redux";
import { requestUsers } from "../../store/actions/usersA";
import { requestUserProfile } from "../../store/actions/userProfileA";
import { requestUserRecordsAll } from "../../store/actions/userRecordsA";
import { submitUserForm, removeUser } from "../../store/actions/usersA";
// app components
import UsersLayout from "./UsersLayout";
import UserFormMain from "./UserFormMain";
// layout
import Layout from "../../layout/Layout";

class MembersRegistry extends React.Component {
  state = {
    open: false
  };

  componentDidMount() {
    this.props.requestUsers();
  }

  openUserForm = () => {
    this.setState({
      open: true
    });
  };

  closeUserForm = () => {
    this.setState({
      open: false
    });
  };

  selectUser = e => {
    const id = e.currentTarget.id;
    this.props.requestUserProfile(id);
    this.props.requestUserRecordsAll(id);
  };

  removeUser = id => {
    let counter = 1;
    let req = false;
    for (let i in id) {
      req = counter === id.length ? true : false;
      counter += 1;
      this.props.removeUser(id[i], req);
    }
  };

  render() {
    const { users, submitUserForm } = this.props;
    const { open } = this.state;

    return (
      <Layout>
        <UsersLayout
          users={users}
          removeUser={this.removeUser}
          openUserForm={this.openUserForm}
          selectUser={this.selectUser}
        />
        <UserFormMain
          openAddUser={open}
          closeUserForm={this.closeUserForm}
          submitUserForm={submitUserForm}
        />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.usersReducer.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestUserProfile: id => dispatch(requestUserProfile(id)),
    requestUsers: () => dispatch(requestUsers()),
    requestUserRecordsAll: id => dispatch(requestUserRecordsAll(id)),
    submitUserForm: lead => dispatch(submitUserForm(lead)),
    removeUser: (id, req) => dispatch(removeUser(id, req))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MembersRegistry);
