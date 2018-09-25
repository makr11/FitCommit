import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { deleteInstance } from '../../../redux/actions';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const mapStateToProps = state => {
    return {
    records: state.userRecordsReducer.records,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        deleteInstance: (e) => dispatch(deleteInstance(e.currentTarget.id, e.currentTarget.name)),
    }
}

class ListRecords extends React.Component {

    render(){
        const { classes, records, deleteInstance } = this.props;

        return(
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell>Usluga</TableCell>
                        <TableCell >Opcija</TableCell>
                        <TableCell numeric>Broj dolazaka</TableCell>
                        <TableCell numeric>Cijena</TableCell>
                        <TableCell>Započelo</TableCell>
                        <TableCell>Ističe</TableCell>
                        <TableCell>Obriši</TableCell>
                    </TableRow>
                    </TableHead>
                    {(records)?
                        <TableBody>
                        {records.map(record => {
                            return (
                            <TableRow key={record.id}>
                                <TableCell>{record.service}</TableCell>
                                <TableCell>{record.category}</TableCell>
                                <TableCell numeric>{record.quantity}</TableCell>
                                <TableCell>{record.price + " kn"}</TableCell>
                                <TableCell>{record.started}</TableCell>
                                <TableCell>{record.ends}</TableCell>
                                <TableCell>
                                    <IconButton name="record" id={record.id} onClick={deleteInstance}>    
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            );
                        })}
                    </TableBody>:undefined}
                </Table>
            </Paper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListRecords));