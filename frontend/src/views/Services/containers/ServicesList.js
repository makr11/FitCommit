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

import { requestServices, deleteInstance } from '../../../redux/actions';

import ServicesForm from './ServicesForm';

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
        services: state.requestServicesReducer.services,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getServices: () => dispatch(requestServices()),
        deleteInstance: (e) => dispatch(deleteInstance(e.currentTarget.id, e.currentTarget.name))
    }
};

class ServicesList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            serviceId: undefined,
            categoryId: undefined,
            optionId: undefined,
            updateId: undefined,
            updateName: "",
            openForm: false,
        };
    };

    showForm = e => {
        e.preventDefault();

        let nameId = parseInt(e.currentTarget.name, 10);
        let name = e.currentTarget.name
        let id = parseInt(e.currentTarget.id, 10);

        this.setState((prevState) => {
            if(Number.isInteger(nameId)) {
                return{
                    serviceId: undefined,
                    categoryId: nameId,
                    optionId: id, 
                    openForm: true,
                    updateName: nameId,
                    updateId: id,
                }
            }else if (name==="service") {
                return{
                    openForm: true
                }
            }else if (name==="category") {
                return{
                    serviceId: id,
                    categoryId: undefined,
                    optrionId: undefined,
                    openForm: true,
                    updateName: name,
                    updateId: id,
                }
            }else if (name==="option"){
                return{
                    serviceId: undefined,
                    categoryId: id,
                    optionId: undefined,
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
        const { classes, services, deleteInstance } = this.props;

        return (
            (services!==undefined) ?
                <div className={classes.root}>
                    <Button name="service" onClick={this.showForm}>
                        Nova usluga
                    </Button>
                    <ServicesForm 
                        openFormMethod={this.showForm}
                        openForm={this.state.openForm}
                        serviceID={null}
                        serviceIDCheck={null}
                        categoryID={null}
                        title="Nova usluga"
                    />
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
                                            <Button name="category" id={category.id} onClick={deleteInstance}>
                                                Obriši
                                            </Button>
                                            <Button name="option" id={category.id} onClick={this.showForm}>
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
                                                        <Button name="option" id={option.id} onClick={deleteInstance}>
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
                                                    serviceID={null}
                                                    serviceHidden={true}
                                                    categoryID={category.id}
                                                    categoryIDCheck={this.state.categoryId}
                                                    categoryHidden={true}
                                                    optionID={this.state.optionId}
                                                    openFormMethod={this.showForm}
                                                    openForm={this.state.openForm}                                    
                                                />                                       
                                        </Paper>   
                                    )
                                    })}
                                </ExpansionPanelDetails>
                                <ServicesForm  
                                    serviceID={service.id}
                                    serviceIDCheck={this.state.serviceId}
                                    serviceHidden={true}
                                    categoryID={null}
                                    openFormMethod={this.showForm}
                                    openForm={this.state.openForm}
                                    title="Nova opcija"
                                />
                                <ExpansionPanelActions>
                                    <Button name="service" id={service.id} onClick={deleteInstance}>
                                        Obriši
                                    </Button>
                                    <Button name="category" id={service.id} onClick={this.showForm}>
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