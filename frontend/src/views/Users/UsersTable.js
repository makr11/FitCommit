import React from 'react';
// react router
import { Link } from 'react-router-dom';
// material ui core
import { withStyles } from '@material-ui/core';
// styles
import { usersTable } from './usersStyle';
// material ui core components
import Paper from '@material-ui/core/Paper';
import Table from '../../components/Table';
import IconButton from '@material-ui/core/IconButton';
// material ui icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const ProfileLink = (props) => {
  const { id, selectUser } = props;
  return(
    <Link to={'/profile/' + id}>
      <IconButton id={id} onClick={selectUser}>
        <AccountCircleIcon/>
      </IconButton>
    </Link>
  )
}

function UsersTable(props){
  const { classes, users, selectUser } = props;

  let data = [];
  users.forEach((user) => {
    data.push([
      <ProfileLink id={user.id} selectUser={selectUser}/>,
      user.IDUser,
      user.first_name,
      user.last_name,
      user.email,
      user.debt
    ])
  });
  return(
    <Paper className={classes.tableWrapper}>
      <Table 
        tableHead={[
          'Profil',
          'ID',
          'Ime',
          'Prezime',
          'E-mail',
          'Dug'
        ]}
        tableData={data}
      />
    </Paper>
  ) 
}

export default withStyles(usersTable)(UsersTable);
