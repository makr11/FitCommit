import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TableUserRecords from '../components/TableUserRecords'

import { removeInstance, updateFormRecord } from '../../../redux/actions';

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
        removeInstance: (e) => dispatch(removeInstance(e.currentTarget.id, e.currentTarget.name)),
        paidCheck: (id, index, paid) => dispatch(updateFormRecord(id, index, paid))
    }
}

class ListRecords extends React.Component {
    
    handlePaidCheck(index, paid, e){
        const id = e.currentTarget.id;
        this.props.paidCheck(parseInt(id, 10), parseInt(index, 10), (paid) ? {paid: 0} : {paid: 1});
    }

    render(){
        const { classes, records, removeInstance } = this.props;

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
                        <TableCell>Plaćeno</TableCell>
                        <TableCell>Obriši</TableCell>
                    </TableRow>
                    </TableHead>
                    {(records)?
                        <TableBody>
                        {records.map((record, index) => {
                            return (
                                <TableUserRecords
                                key={record.id}
                                record={record}
                                index={index}
                                removeInstance={removeInstance}
                                handlePaidCheck={this.handlePaidCheck}
                                paidCheck={this.props.paidCheck}
                                />
                            );
                        })}
                    </TableBody>:undefined}
                </Table>
            </Paper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListRecords));