import React from 'react';
// redux
import { connect } from 'react-redux';
import { requestUserProfile } from '../../store/actions/userProfileA';
import { submitFormUser } from '../../store/actions/usersA';
// material ui core
import { withStyles } from '@material-ui/core/styles';
// material ui core components
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
// material ui icons
import AddIcon from '@material-ui/icons/Add';
// app components
import UsersTable from './UsersTable/UsersTable';
import UserFormMain from './UserFormMain/UserFormMain';
// jss style
import { users } from './usersStyle';

class MembersRegistry extends React.Component {
  state = {
    open: false,
  }

  openFormDialog = () => {
    this.setState({
      open: true,
    })
  };

  closeFormDialog = () => {
    this.setState({
      open: false,
    })
  };

  render(){

    const { classes, users, selectUser, removeUser, submitFormUser } = this.props;
    const { open } = this.state;

    return (
      <div>
        <UserFormMain
          open={open}
          closeFormDialog={this.closeFormDialog}
          submitFormUser={submitFormUser}
        />
        <UsersTable
          users={users}
          selectUser={selectUser}
          removeUser={removeUser}
        />
        <Tooltip title="Novi član">
          <Fab color="primary" className={classes.addIcon} onClick={this.openFormDialog}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
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
    submitFormUser: (lead) => dispatch(submitFormUser(lead))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)((withStyles)(users)(MembersRegistry));
