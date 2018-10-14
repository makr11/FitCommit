import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import UserArrival from './containers/UserArrival';

import {requestArrivalsByDate, deleteInstance} from '../../redux/actions'

const styles = (theme) => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 150,
    },
    button: {
    margin: theme.spacing.unit,
    },
    table: {
        minWidth: 700,
    },
});

const mapStateToProps = state => {
    return {
        arrivals: state.arrivalsByDateReducer.arrivals,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectArrivals: (date) => dispatch(requestArrivalsByDate(date)),
        deleteArrivals: (e) => dispatch(deleteInstance(e.currentTarget.name, e.currentTarget.id))
    }
};

class Arrivals extends React.Component { 
    constructor(props){
        super(props);
        let date = new Date(); 
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        if(month<10) {
            month = '0' + month
        };
        if(day<10){
            day = '0' + date.getDate()
        }; 
        this.state = {
            selectedDate: year + '-' + month + '-' + day,
        };
    }; 

    componentDidMount(){
        this.props.selectArrivals(this.state.selectedDate);
    }

    setDate = (e) => {
        const date = e.currentTarget.value;
        this.setState({
            selectedDate: date
        },
        () => this.props.selectArrivals(date))
    };

    render() {
        const { classes, arrivals, deleteArrivals } = this.props;
        const { selectedDate } = this.state;

        return(
            <Paper>
                <Typography variant="title">
                    Evidencija dolazaka
                </Typography>
                <TextField
                    id="date"
                    label="Datum"
                    type="date"
                    defaultValue={selectedDate}
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={this.setDate}
                />
                <UserArrival date={selectedDate}/>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell>Korisnik</TableCell>
                        <TableCell>Usluga</TableCell>
                        <TableCell>Dolazak</TableCell>
                        <TableCell>Dug</TableCell>
                        <TableCell>Obriši</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {arrivals.map(arrival => {
                        return (
                            <TableRow key={arrival.id} >
                                <TableCell>{arrival.user}</TableCell>
                                <TableCell>{arrival.category + ' (' + arrival.service + ')'}</TableCell>
                                <TableCell>{arrival.arrival_time}</TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                    <IconButton name="arrival" id={arrival.id} onClick={deleteArrivals}>    
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Arrivals));