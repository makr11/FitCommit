import React from 'react';
// react router
import { Link } from 'react-router-dom';
// material ui core
import { withStyles } from '@material-ui/core';
// styles
import { usersTable } from './usersStyle';
// material ui core components
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
// material ui icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function UsersTable(props){
  const { classes, users, selectUser } = props;
  return(
    <Paper className={classes.tableWrapper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Profil</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Ime</TableCell>
            <TableCell>Prezime</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Dug</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {users.map(user => {
          return (
            <TableRow key={user.id} >
              <TableCell>
                <Link to={'/profile/' + user.id}>
                  <IconButton id={user.id} onClick={selectUser}>
                    <AccountCircleIcon/>
                  </IconButton>
                </Link>
              </TableCell>
              <TableCell>{user.IDUser}</TableCell>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.last_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.debt}</TableCell>
            </TableRow>
          );
        })}
        </TableBody>
      </Table>
    </Paper>
  ) 
}

export default withStyles(usersTable)(UsersTable);
