import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { requestServices } from '../actions';

import {services,
        categories,
        options,
} from '../apiUrls';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

const mapStateToProps = state => {
    return {
        services: state.requestServicesRegistry.services,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestServices: () => dispatch(requestServices()),
    }
}

class ServicesList extends React.Component {

    componentDidMount() {
        this.props.onRequestServices();
    };

    handleDeleteServiceClick = (e) => {
        e.preventDefault();
        const id = e.currentTarget.id;
        const conf = {
            method: "DELETE",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          };
        switch (e.currentTarget.name){
            case "service":
                fetch(services + id, conf).then(response => console.log(response))
                .then(() => {
                    this.props.onRequestServices();
                });
            case "category":
                fetch(categories + id, conf).then(response => console.log(response))
                .then(() => {
                    this.props.onRequestServices();
                });
            case "option":
                fetch(options + id, conf).then(response => console.log(response))
                .then(() => {
                    this.props.onRequestServices();
                });
        }
    }

    render() {
        const { classes, services } = this.props;

        return (
            (services!==undefined) ?
                <div className={classes.root}>
                    {services.map(service => {
                        return(
                            <ExpansionPanel key={service.id}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.heading}>{service.service}</Typography>
                                    <Button name="service" id={service.id} onClick={this.handleDeleteServiceClick}>
                                        Obriši
                                    </Button>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    {service.categories.map(category => {
                                        return(
                                        <Paper>
                                            <Typography key={category.id}>
                                                {category.category}
                                            </Typography>
                                            <Button name="category" id={category.id} onClick={this.handleDeleteServiceClick}>
                                                Obriši
                                            </Button>
                                                <Table>
                                                <TableHead>
                                                <TableRow>
                                                    <TableCell>Broj dolazaka</TableCell>
                                                    <TableCell numeric>Cijena</TableCell>
                                                    <TableCell numeric>Trajanje</TableCell>
                                                    <TableCell numeric>Obriši</TableCell>
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {category.options.map(option => {
                                                    return (
                                                    <TableRow key={option.id}>
                                                        <TableCell numeric>{option.quantity}</TableCell>
                                                        <TableCell numeric>{option.price}</TableCell>
                                                        <TableCell numeric>{option.duration}</TableCell>
                                                        <TableCell numeric>
                                                            <Button name="option" id={option.id} onClick={this.handleDeleteServiceClick}>
                                                               X
                                                            </Button>
                                                        </TableCell>
                                                        
                                                    </TableRow>
                                                    );
                                                })}
                                                </TableBody>
                                            </Table>
                                            
                                        </Paper>
                                      )
                                    })}
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        )
                    })}
                </div>:                  
            <h1>Loading</h1>
        );
    }
}

ServicesList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ServicesList));