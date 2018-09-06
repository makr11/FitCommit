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
import DeleteIcon from '@material-ui/icons/Delete';

import { requestServices } from '../../../redux/actions';

import ServicesForm from './ServicesForm';

import {services,
        categories,
        options,
} from '../../../redux/apiUrls';

const styles = theme => ({
  root: {
    width: '100%',
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
            categoryId: null,
            optionId: null,
            updateId: null,
            updateName: "",
            openForm: false,
        };
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

        let nameId = parseInt(e.currentTarget.name, 10);
        let name = e.currentTarget.name
        let id = parseInt(e.currentTarget.id, 10);

        this.setState((prevState) => {
            if(Number.isInteger(nameId)) {
                return{
                    serviceId: null,
                    categoryId: nameId,
                    optionId: id, 
                    openForm: true,
                    updateName: nameId,
                    updateId: id,
                }
            }else if (name==="service") {
                return{
                    serviceId: id,
                    categoryId: null,
                    openForm: true,
                    updateName: name,
                    updateId: id,
                }
            }else if (name==="category"){
                return{
                    serviceId: null,
                    categoryId: id,
                    optionId: null,
                    openForm: true,
                    updateName: name,
                    updateId: id, 
                }
            } else if (name==="close"){
                if(prevState.openForm){
                    return {openForm: false}
                }else{
                    return {openForm: true}
                }
            }
        })
    };

    render() {
        const { classes, services } = this.props;

        return (
            (services!==undefined) ?
                <div className={classes.root}>
                    {services.map(service => {
                        return(
                            <ExpansionPanel key={service.id}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="title">{service.service}</Typography>
                                    
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.table} >
                                    {service.categories.map(category => {
                                        return(
                                        <Paper key={category.id} >
                                            <Typography variant="title">
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
                                                            <DeleteIcon />
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button name={category.id} id={option.id} onClick={this.showForm}>
                                                            <AppsIcon />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                                );
                                                })}
                                                </TableBody>
                                                </Table>
                                                <ServicesForm
                                                serviceID={service.id} 
                                                serviceHidden={true}
                                                categoryID={category.id}
                                                categoryIDCheck={this.state.categoryId}
                                                categoryHidden={true}
                                                optionID={this.state.optionId}
                                                openForm={this.state.openForm}
                                                openFormMethod={this.showForm}
                                                />                                       
                                        </Paper>   
                                    )
                                    })}
                                </ExpansionPanelDetails>
                                <ServicesForm 
                                serviceName={service.service} 
                                serviceID={service.id}
                                serviceIDCheck={this.state.serviceId}
                                serviceHidden={true}
                                categoryIDCheck={false}
                                openForm={this.state.openForm}
                                />
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