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

import { requestServices, removeInstance, onFormChangeFields, submitFormService } from '../../../redux/actions';

import ServicesFormDialog from '../components/ServicesFormDialog';

const styles = theme => ({
  root: {
    width: '100%',
  },
  table: {
    display: 'block',
  },
  categoryHeadings: {
    display: 'inline-block',
  },
  categoryButtons: {
    float: 'right',
  }
});

const mapStateToProps = state => {
    return {
        services: state.servicesReducer.services,
        service: state.formInput.service,
        category: state.formInput.category,
        arrivals: state.formInput.arrivals,
        price: state.formInput.price,
        duration: state.formInput.duration,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleChange: (e) => {
            const obj = {[e.target.id]: e.target.value};
            dispatch(onFormChangeFields(obj));
        },
        handleSubmit: (lead) => dispatch(submitFormService(lead)),
        getServices: () => dispatch(requestServices()),
        removeInstance: (e) => dispatch(removeInstance(e.currentTarget.id, e.currentTarget.name))
    }
};

class ServicesList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title: '',
            open: false,
            update: false,
            index: null,
            service: {},
            category: {},
            option: {},
        };
    };
            
    openFormDialog = (serviceIndex, categoryIndex, optionIndex, e) => {
        let name = e.currentTarget.name;
        let index = parseInt(e.currentTarget.id, 10);
        let update = false;
        let title = '';
        let service = this.props.services[serviceIndex];
        let category = (service)?service.categories[categoryIndex]:undefined;
        let option = (category)?category.options[optionIndex]:undefined;

        if(name==="service"){
            title='Upiši novu uslugu'
        }else if(name==="category"){
            title='Upiši novu opciju'
        }else if(name==="option"){
            title='Upiši novu cijenu'
        }else if(name==="serviceUpdate"){
            title='Izmijeni uslugu';
            update=true;
        }else if(name==="categoryUpdate"){
            title='Izmijeni opciju';
            update=true;
        }else if(name==="optionUpdate"){
            title='Izmijeni cijenu';
            update=true;
        }
        this.setState({
            open: true,
            title: title,
            update: update,
            index: index,
            service: service,
            category: category,
            option: option
        })
    }

    closeFormDialog = () => {
        this.setState({open: false})
    }
    
    render() {
        const { classes, services, removeInstance, handleChange } = this.props;
        return (
            <div className={classes.root}>
                <Button name="service" onClick={this.openFormDialog.bind(this, null, null, null)}>
                    Nova usluga
                </Button>
                {services.map((service, serviceIndex) => {
                    return(
                        <ExpansionPanel key={service.id}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="title">{service.service}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.table} >
                                {service.categories.map((category, categoryIndex) => {
                                    return(
                                    <Paper key={category.id} >
                                        <Typography 
                                        className={classes.categoryHeadings} 
                                        variant="title">
                                            {category.category}
                                        </Typography>
                                        <Button 
                                        className={classes.categoryButtons} 
                                        name="category" 
                                        id={category.id} 
                                        onClick={removeInstance}>
                                            Obriši
                                        </Button>
                                        <Button 
                                        className={classes.categoryButtons} 
                                        name="option" 
                                        id={category.id} 
                                        onClick={this.openFormDialog.bind(this, serviceIndex, categoryIndex, null)}>
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
                                        {category.options.map((option, optionIndex) => {
                                            return (
                                            <TableRow key={option.id}>
                                                <TableCell numeric>{option.arrivals}</TableCell>
                                                <TableCell numeric>{option.price}</TableCell>
                                                <TableCell numeric>{option.duration}</TableCell>
                                                <TableCell numeric>
                                                    <Button name="option" id={option.id} onClick={removeInstance}>
                                                        <DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button 
                                                    name="optionUpdate" 
                                                    id={option.id} 
                                                    onClick={this.openFormDialog.bind(this, serviceIndex, categoryIndex, optionIndex)}>
                                                        <AppsIcon />
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
                            <ExpansionPanelActions>
                                <Button 
                                name="service" 
                                id={service.id} 
                                onClick={removeInstance}>
                                    Obriši
                                </Button>
                                <Button 
                                name="category" 
                                id={service.id} 
                                onClick={this.openFormDialog.bind(this, serviceIndex, null, null)}>
                                    Nova opcija
                                </Button>
                            </ExpansionPanelActions>
                        </ExpansionPanel>
                    )
                })}
                <ServicesFormDialog
                open={this.state.open}
                handleChange={handleChange}
                closeFormDialog={this.closeFormDialog}
                title={this.state.title}
                service={this.state.service}
                category={this.state.category}
                option={this.state.option}
                />
            </div>
        );
    }
}

ServicesList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ServicesList));