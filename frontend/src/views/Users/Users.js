import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { requestUserProfile, removeInstance } from '../../redux/actions';
import AddUser from './containers/AddUser';
import UsersTable from './components/UsersTable';

const mapStateToProps = state => {
  return {
    users: state.usersReducer.users,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectUser: (e) => dispatch(requestUserProfile(e.currentTarget.id)),
    removeInstance: (e) => dispatch(removeInstance(e.currentTarget.id, e.currentTarget.name))
  }
};


class MembersRegistry extends React.Component {

  render(){

    const { users, selectUser, removeInstance } = this.props;
    return (
      <Paper >
        <AddUser/>
        <UsersTable
          users={users}
          selectUser={selectUser}
          removeInstance={removeInstance}
        />
      </Paper>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(MembersRegistry);
