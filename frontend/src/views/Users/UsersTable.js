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
import DeleteIcon from '@material-ui/icons/Delete';

const ProfileLink = (props) => {
  const { id, selectUser } = props;
  return(
    <Link to={'/profile/' + id}>
      <IconButton id={id} onClick={selectUser}>
        <AccountCircleIcon/>
      </IconButton>
    </Link>
  )
};

const Delete = (props) => {
  const { id, removeUser } = props;
  return(
    <IconButton id={id} onClick={removeUser}>
      <DeleteIcon/>
    </IconButton>
  )
};

function UsersTable(props){
  const { classes, users, selectUser, removeUser } = props;

  let data = [];
  users.forEach((user) => {
    data.push([
      {
        'data': <ProfileLink id={user.id} selectUser={selectUser}/>,
        'padding': 'checkbox',
        'align': 'center'
      },
      {
        'data': user.IDUser,
        'padding': 'dense',
        'align': 'left'
      },
      {
        'data': user.first_name,
        'padding': 'dense',
        'align': 'left'
      },
      {
        'data': user.last_name,
        'padding': 'dense',
        'align': 'left'
      },
      {
        'data': user.email,
        'padding': 'dense',
        'align': 'left',
      },
      {
        'data': user.debt,
        'padding': 'dense',
        'align': 'right'
      },
      {
        'data': <Delete id={user.id} removeUser={removeUser}/>,
        'padding': 'checkbox',
        'align': 'center'
      }
    ])
  });
  return(
    <Paper className={classes.tableWrapper}>
      <Table 
        tableHead={[
          {
            'title': 'Profil',
            'padding': 'checkbox',
            'align': 'center'
          },
          {
            'title': 'ID',
            'padding': 'dense',
            'align': 'left'
          },
          {
            'title': 'Ime',
            'padding': 'dense',
            'align': 'left'
          },
          {
            'title': 'Prezime',
            'padding': 'dense',
            'align': 'left'
          },
          {
            'title': 'E-mail',
            'padding': 'dense',
            'align': 'left'
          },
          {
            'title': 'Dug', 
            'padding': 'dense',
            'align': 'right'
          },
          {
            'title': 'Obriši', 
            'padding': 'checkbox',
            'align': 'center'
          }
        ]}
        tableData={data}
      />
    </Paper>
  ) 
}

export default withStyles(usersTable)(UsersTable);
