import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { requestServices, removeInstance, submitFormService, updateFormService } from '../../../redux/actions';
import ServicesSubmitForm from '../components/ServicesSubmitForm';
import ServicesUpdateForm from '../components/ServicesUpdateForm';
import OptionsTable from '../components/OptionsTable';

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
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (lead) => dispatch(submitFormService(lead)),
    handleUpdate: (lead) => dispatch(updateFormService(lead)),
    getServices: () => dispatch(requestServices()),
    removeInstance: (e) => dispatch(removeInstance(e.currentTarget.id, e.currentTarget.name))
  }
};

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
    const id = this.state.id;
    const name = this.state.name;
    const service = this.state.service;
    const category = this.state.category;
    const arrivals = parseInt(this.state.arrivals, 10);
    const price = parseInt(this.state.price, 10);
    const duration = parseInt(this.state.duration, 10);
    const lead = { id, name, service, category, arrivals, price, duration };
    this.setState({
      openSubmitForm: false,
      openUpdateForm: false,
      componentUpdate: true,
    });
    (!this.state.update)?this.props.handleSubmit(lead):this.props.handleUpdate(lead);
  };

  // TODO: if user didn't change in update -> just close form

  render() {
    const { classes, services, removeInstance } = this.props;
    return (
      <div className={classes.root}>
        <Button name="service" onClick={this.setStateForm.bind(this, null, null, null)}>
          Nova usluga
        </Button>
        {services.map((service, serviceIndex) => {
        return(
          <ExpansionPanel key={service.id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="title">{service.service}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.table} >
              <Button
                name="serviceUpdate"
                id={service.id}
                onClick={this.setStateForm.bind(this, serviceIndex, null, null)}
              >
                  Izmijeni
              </Button>
              <Button
                name="category"
                id={service.id}
                onClick={this.setStateForm.bind(this, serviceIndex, null, null)}
              >
                Nova opcija
              </Button>
              <Button
                name="service"
                id={service.id}
                onClick={removeInstance}
              >
                Obriši
              </Button>
              {service.categories.map((category, categoryIndex) => {
                return(
                  <Paper key={category.id} >
                    <Typography
                      className={classes.categoryHeadings}
                      variant="title"
                    >
                      {category.category}
                    </Typography>
                    <Button
                      className={classes.categoryButtons}
                      name="category"
                      id={category.id}
                      onClick={removeInstance}
                    >
                      Obriši
                    </Button>
                    <Button
                      className={classes.categoryButtons}
                      name="option"
                      id={category.id}
                      onClick={this.setStateForm.bind(this, serviceIndex, categoryIndex, null)}
                    >
                      Nova cijena
                    </Button>
                    <Button
                      name="categoryUpdate"
                      id={category.id}
                      className={classes.categoryButtons}
                      onClick={this.setStateForm.bind(this, serviceIndex, categoryIndex, null)}
                    >
                      Izmijeni
                    </Button>
                    <OptionsTable
                      options={category.options}
                      removeInstance={removeInstance}
                      setStateForm={this.setStateForm.bind(this, serviceIndex, categoryIndex, null)}
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
      </div>
    );
  }
}

ServicesList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ServicesList));
