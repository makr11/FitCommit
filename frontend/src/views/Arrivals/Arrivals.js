import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import UserArrival from './containers/UserArrival';

const styles = (theme) => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 150,
    },
    button: {
    margin: theme.spacing.unit,
    },
});

class Arrivals extends React.Component {   

    render() {
        const { classes } = this.props;

        return(
            <Paper>
                <Typography variant="title">
                    Evidencija dolazaka
                </Typography>
                <form className={classes.container} noValidate>
                    <TextField
                        id="date"
                        label="Datum"
                        type="date"
                        defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <Button 
                    variant="outlined" 
                    color="primary" 
                    className={classes.button}
                    type="submit"
                    >
                        Izaberi
                    </Button>
                </form>
                <UserArrival />
            </Paper>
        )
    }
};

export default withStyles(styles)(Arrivals);