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
        services: state.servicesReducer.services,
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
            positionParam: undefined,
            id: null,
            title: '',
        };
    };
    
    showForm = e => {
        e.preventDefault();
        const name = e.currentTarget.name;
        if(name==="service"){
            this.setState({
                title: 'Nova usluga'
            })
        }else if(name==="category"){
            this.setState({
                title: 'Nova opcija'
            })
        }else if(name==="option"){
            this.setState({
                title: "Nova cijena"
            })
        }else if(name==="close"){
            this.setState({
                positionParam: undefined
            })
        };
        
        this.setState({
            positionParam: name,
            id: parseInt(e.currentTarget.id,10),
        })
    };
            
    showUpdateForm = (id, e) => {
        e.preventDefault();
        const name = e.currentTarget.name;

        if(name==="serviceUpdate"){
            this.setState({
                title: 'Izmijeni uslugu'
            })
        }else if(name==="categoryUpdate"){
            this.setState({
                title: 'Izmijeni opciju'
            })
        }else if(name==="optionUpdate"){
            this.setState({
                title: 'Izmijeni cijenu'
            })
        }

        this.setState({
            positionParam: name,
            updateId: parseInt(e.currentTarget.id,10),
            id: id,
        })
    };
    
    render() {
        const { classes, services, deleteInstance } = this.props;
        console.log(this.state);
        return (
            (services!==undefined) ?
                <div className={classes.root}>
                    <Button name="service" onClick={this.showForm}>
                        Nova usluga
                    </Button>
                    {(this.state.positionParam==="service")?
                    <ServicesForm  
                        id={this.state.id}
                        close={this.showForm}
                        title={this.state.title}
                    />:undefined
                    }
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
                                            <Button name="categoryUpdate" id={category.id} onClick={this.showUpdateForm.bind(this, category.id)}>
                                                Izmijeni
                                            </Button>
                                            {(this.state.positionParam==="categoryUpdate" && category.id===this.state.id)?
                                            <ServicesForm  
                                                hideService={true}
                                                hideOption={true}
                                                serviceID={service.id}
                                                categoryID={category.id}
                                                close={this.showForm}
                                                title={this.state.title}
                                                update={true}
                                            />:undefined
                                            }
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
                                                        <Button name="optionUpdate" id={option.id} onClick={this.showUpdateForm.bind(this, category.id)}>
                                                            <AppsIcon />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                                );       
                                                })}
                                                </TableBody>
                                                </Table>
                                                {((this.state.positionParam==="option"||this.state.positionParam==="optionUpdate") && category.id===this.state.id)?
                                                <ServicesForm
                                                    hideService={true}
                                                    hideCategory={true} 
                                                    serviceID={service.id} 
                                                    categoryID={category.id}
                                                    optionID={this.state.updateId}
                                                    close={this.showForm}
                                                    title={this.state.title}
                                                    update={(this.state.positionParam==="optionUpdate")?true:false}                             
                                                />:undefined
                                                }                                       
                                        </Paper>   
                                    )
                                    })}
                                </ExpansionPanelDetails>
                                {(this.state.positionParam==="category" && service.id===this.state.id)?
                                <ServicesForm  
                                   hideService={true}
                                   serviceID={service.id} 
                                   id={(service.id===this.state.id)?this.state.id:null}
                                   close={this.showForm}
                                   title={this.state.title}
                                />:undefined
                                }
                                {(this.state.positionParam==="serviceUpdate" && service.id===this.state.id)?
                                <ServicesForm  
                                    hideCategory={true}
                                    hideOption={true}
                                    serviceID={service.id}
                                    id={(service.id===this.state.id)?this.state.id:null}
                                    close={this.showForm}
                                    title={this.state.title}
                                    update={true}
                                />:undefined
                                }
                                <ExpansionPanelActions>
                                    <Button name="service" id={service.id} onClick={deleteInstance}>
                                        Obriši
                                    </Button>
                                    <Button name="category" id={service.id} onClick={this.showForm}>
                                        Nova opcija
                                    </Button>
                                    <Button name="serviceUpdate" id={service.id} onClick={this.showUpdateForm.bind(this, service.id)}>
                                        Izmijeni
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