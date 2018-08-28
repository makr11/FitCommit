import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AppsIcon from '@material-ui/icons/Apps';

import { requestServices } from '../../../redux/actions';

import ServicesForm from './ServicesForm';

import {services,
        categories,
        options,
} from '../../../redux/apiUrls';
import { IconButton } from '../../../../node_modules/@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  table: {
    display: 'block',
  }
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

    constructor(props){
        super(props);
        this.state = {
            serviceId: null,
            categoryId: null
        }
    };

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
                break
            case "category":
                fetch(categories + id, conf).then(response => console.log(response))
                .then(() => {
                    this.props.onRequestServices();
                });
                break
            case "option":
                fetch(options + id, conf).then(response => console.log(response))
                .then(() => {
                    this.props.onRequestServices();
                });
                break
            default:
                break
        }
    }

    showForm = e => {
        e.preventDefault();
        
        switch (e.currentTarget.name){
            case ('service'):
                this.setState({
                    serviceId: parseInt(e.currentTarget.id, 10),
                    categoryId: null
                })
                break
            case ('category'):
                this.setState({
                    serviceId: null,
                    categoryId: parseInt(e.currentTarget.id, 10),
                })
                break
            default:
                break
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
                                    
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.table} >
                                    {service.categories.map(category => {
                                        return(
                                        <Paper key={category.id} >
                                            <Typography>
                                                {category.category}
                                            </Typography>
                                            <Button name="category" id={category.id} onClick={this.handleDeleteServiceClick}>
                                                Obriši
                                            </Button>
                                            <Button name="category" id={category.id} onClick={this.showForm}>
                                                Nova cijena
                                            </Button>
                                                <Table >
                                                <TableHead>
                                                <TableRow>
                                                    <TableCell>Broj dolazaka</TableCell>
                                                    <TableCell numeric>Cijena</TableCell>
                                                    <TableCell numeric>Trajanje</TableCell>
                                                    <TableCell >Obriši</TableCell>
                                                    <TableCell >Izmijeni</TableCell>
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
                                                        <TableCell>
                                                            <IconButton>
                                                                <AppsIcon id={option.id} />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                    );
                                                })}
                                                </TableBody>
                                            </Table>
                                            {
                                            (category.id===this.state.categoryId)?
                                            <ServicesForm
                                               serviceName={service.service} 
                                               serviceID={service.id} 
                                               categoryName={category.category} 
                                               categoryID={category.id}
                                           />:
                                            <span></span>
                                           }
                                        </Paper>   
                                    )
                                    })}

                                </ExpansionPanelDetails>
                                {
                                 (service.id===this.state.serviceId)?
                                 <ServicesForm 
                                    serviceName={service.service} 
                                    serviceID={service.id}
                                />:
                                 <span></span>
                                }
                                <ExpansionPanelActions>
                                    <Button name="service" id={service.id} onClick={this.handleDeleteServiceClick}>
                                        Obriši
                                    </Button>
                                    <Button name="service" id={service.id} onClick={this.showForm}>
                                        Nova opcija
                                    </Button>
                                </ExpansionPanelActions>
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