import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

import { requestUserProfile, requestMembers } from '../../redux/actions';

import SignIn from './containers/SignIn';

import {users} from '../../redux/apiUrls';

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
        members: state.requestMembersRegistry.members,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestMembers: () => dispatch(requestMembers()),
        handleSelectUserClick: (e) => dispatch(requestUserProfile(e.currentTarget.id)),
    }
}


class MembersRegistry extends React.Component {

    handleDeleteUserClick = (e) => {
        e.preventDefault();
        const user = e.currentTarget.id;
        const conf = {
            method: "DELETE",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          };
        fetch(users + user, conf).then(response => console.log(response))
        .then(() => {
            this.props.onRequestMembers();
        });
    }

    render(){

        const { classes, members, handleSelectUserClick } = this.props;
        console.log(members)
        return (
          
          (members!==undefined) ?
          <Paper className={classes.root}>
            <SignIn/>
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
                {members.map(n => {
                    return (
                        <TableRow key={n.id} >
                            <TableCell>     
                                <Link to={'/profile/' + n.username}>
                                    <IconButton id={n.id} onClick={handleSelectUserClick}>
                                        <AccountCircleIcon/>
                                    </IconButton>
                                </Link> 
                            </TableCell>
                            <TableCell>{n.first_name}</TableCell>
                            <TableCell>{n.last_name}</TableCell>
                            <TableCell>{n.email}</TableCell>
                            <TableCell>
                                <IconButton id={n.id} onClick={this.handleDeleteUserClick}>    
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
  
  MembersRegistry.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MembersRegistry));