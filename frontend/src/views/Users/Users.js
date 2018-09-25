import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { requestUserProfile, deleteInstance } from '../../redux/actions';

import AddUser from './containers/AddUser';

const styles = () => ({
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });

const mapStateToProps = state => {
    return {
        users: state.usersReducer.users,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSelectUserClick: (e) => dispatch(requestUserProfile(e.currentTarget.id)),
        deleteInstance: (e) => dispatch(deleteInstance(e.currentTarget.id, e.currentTarget.name))
    }
};


class MembersRegistry extends React.Component {

    render(){

        const { classes, users, handleSelectUserClick, deleteInstance } = this.props;
        return (
          
          (users!==undefined) ?
          <Paper className={classes.root}>
            <AddUser/>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>Profil</TableCell>
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
                                    <IconButton id={user.id} onClick={handleSelectUserClick}>
                                        <AccountCircleIcon/>
                                    </IconButton>
                                </Link> 
                            </TableCell>
                            <TableCell>{user.first_name}</TableCell>
                            <TableCell>{user.last_name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <IconButton name="user" id={user.id} onClick={deleteInstance}>    
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    );
                })}
                </TableBody>
            </Table>
          </Paper> :
          <h1>Loading</h1>
        )
    }
    
}
  
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MembersRegistry));