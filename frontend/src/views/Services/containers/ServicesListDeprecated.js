import React from 'react';
// redux
import { connect } from 'react-redux';
import { requestServices, removeServices, submitFormService, updateFormService } from '../../../actions/servicesActions';
// prop type check
import PropTypes from 'prop-types';
// material ui core
import { withStyles } from '@material-ui/core/styles';
import { servicesListStyle } from '../../../assets/jss/services';
// material ui core components
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
// material ui icons
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// services components
import ServicesSubmitForm from './FormDialog';
import ServicesUpdateForm from '../components/ServicesUpdateForm';
import OptionsTable from '../components/OptionsTable';
import ServiceButtons from '../components/ServiceButtons';
import CategoryButtons from '../components/CategoryButtons';

class ServicesList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      openSubmitForm: false,
      openUpdateForm: false,
      update: false,
      componentUpdate: true,
    };
  };

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.componentUpdate){
      return true
    }else{
      return false
    }
  };

  setStateForm = (serviceIndex, categoryIndex, optionIndex, e) => {
    let id = e.currentTarget.id;
    let name = e.currentTarget.name;
    let update = false;
    let title = '';
    let service = (serviceIndex!==null)?this.props.services[serviceIndex]:undefined;
    let category = (categoryIndex!==null)?service.categories[categoryIndex]:undefined;
    let option = (optionIndex!==null)?category.options[optionIndex]:{};

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
      openSubmitForm: !update,
      openUpdateForm: update,
      update: update,
      id: id,
      name: name,
      title: title,
      componentUpdate: true,
      service: service,
      category: category,
      arrivals: option.arrivals,
      price: option.price,
      duration: option.duration
    })
  };

  closeFormDialog = () => {
    this.setState({
      openSubmitForm: false,
      openUpdateForm: false,
      componentUpdate: true,
    })
  };

  handleFormInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      componentUpdate: false
    });
  };

  handleFormSubmit = () => {
    let id = this.state.id;
    let name = this.state.name;
    let service = this.state.service;
    let category = this.state.category;
    let arrivals = parseInt(this.state.arrivals, 10);
    let price = parseInt(this.state.price, 10);
    let duration = parseInt(this.state.duration, 10);
    let lead = { id, name, service, category, arrivals, price, duration };
    this.setState({
      openSubmitForm: false,
      openUpdateForm: false,
      componentUpdate: true,
    });
    (!this.state.update)?this.props.handleSubmit(lead):this.props.handleUpdate(lead);
  };

  // TODO: if user didn't change in update -> just close form

  render() {
    const { classes, services, removeServices } = this.props;
    return (
      <div className={classes.root}>
        {services.map((service, serviceIndex) => {
        return(
          <ExpansionPanel key={service.id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="title">{service.service}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.table} >
              <ServiceButtons
                setStateForm={this.setStateForm}
                service={service}
                serviceIndex={serviceIndex}
                removeServices={removeServices}
              />
              {service.categories.map((category, categoryIndex) => {
                return(
                  <Paper key={category.id} >
                    <Typography
                      className={classes.categoryHeadings}
                      variant="title"
                    >
                      {category.category}
                    </Typography>
                    <CategoryButtons
                      setStateForm={this.setStateForm}
                      service={service}
                      category={category}
                      serviceIndex={serviceIndex}
                      categoryIndex={categoryIndex}
                      removeServices={removeServices}
                    />  
                    <OptionsTable
                      options={category.options}
                      serviceIndex={serviceIndex}
                      categoryIndex={categoryIndex}
                      removeServices={removeServices}
                      setStateForm={this.setStateForm}
                    />
                  </Paper>
                )
              })}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
        })}
        <ServicesSubmitForm
          open={this.state.openSubmitForm}
          closeFormDialog={this.closeFormDialog}
          handleChange={this.handleFormInput}
          handleFormSubmit={this.handleFormSubmit}
          title={this.state.title}
          service={this.state.service}
          category={this.state.category}
          arrivals={this.state.arrivals}
          price={this.state.price}
          duration={this.state.duration}
        />
        <ServicesUpdateForm
          open={this.state.openUpdateForm}
          closeFormDialog={this.closeFormDialog}
          handleChange={this.handleFormInput}
          handleFormSubmit={this.handleFormSubmit}
          title={this.state.title}
          service={this.state.service}
          category={this.state.category}
          arrivals={this.state.arrivals}
          price={this.state.price}
          duration={this.state.duration}
        />
        <Tooltip title="Nova usluga">
          <Button
            name="service"
            variant="fab"
            color="primary"
            className={classes.addIcon}
            onClick={this.setStateForm.bind(this, null, null, null)}
          >
            <AddIcon />
          </Button>
        </Tooltip>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    services: state.servicesReducer.services,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (lead) => dispatch(submitFormService(lead)),
    handleUpdate: (lead) => dispatch(updateFormService(lead)),
    getServices: () => dispatch(requestServices()),
    removeServices: (e) => dispatch(removeServices(e.currentTarget.id, e.currentTarget.name))
  }
};


ServicesList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(servicesListStyle)(ServicesList));
