import React from 'react';
// react router
import { Link } from 'react-router-dom';
// material ui core components
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
// material ui icons
import DeleteIcon from '@material-ui/icons/Delete';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

class UsersTable extends React.Component {

  render(){
    const { users, selectUser, removeUser } = this.props;
    return(
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Profil</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Ime</TableCell>
            <TableCell>Prezime</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Obriši</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {users.map(user => {
          return (
            <TableRow key={user.id} >
              <TableCell>
                <Link to={'/profile/' + user.username}>
                  <IconButton id={user.id} onClick={selectUser}>
                    <AccountCircleIcon/>
                  </IconButton>
                </Link>
              </TableCell>
              <TableCell>{user.IDUser}</TableCell>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.last_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <IconButton name="user" id={user.id} onClick={removeUser}>
                  <DeleteIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
        </TableBody>
      </Table>
    )
  }
}

export default UsersTable;
