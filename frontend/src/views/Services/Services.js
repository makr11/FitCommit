import React from 'react';
// redux
import { connect } from 'react-redux';
import { requestServices, removeServices, submitFormService, updateFormService } from '../../store/actions/servicesA';
// material ui core
import { withStyles } from '@material-ui/core';
// styles
import { services } from './servicesStyle';
// prop types
import PropTypes from 'prop-types';
// app components
import ServicesList from './ServicesList/ServicesList';
import ServicesFormMain from './ServicesFormMain/ServicesFormMain';
// material ui components
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class Services extends React.Component{

  state={
    opened: false,
    name: '',
    id: null,
    setStep: undefined,
    update: undefined,
  };

  openFormDialog = (e) => {
    let setStep 
    let id = e.currentTarget.id;
    let name = e.currentTarget.name;
    
    switch(name){
      case 'new':
        setStep = 0
        break
      case 'service':
        setStep = 1
        break
      case 'category':
        setStep = 2
        break
      default:
        setStep = 0
        break
    };

    this.setState({
      opened: true,
      name: name,
      id: id,
      setStep: setStep,
    })
  };

  openUpdateFormDialog = (sIndex, cIndex, oIndex, e) => {
    const { services } = this.props;
    
    let update
    let id = e.currentTarget.id;
    let name = e.currentTarget.name;
    let service = services[sIndex];
    let category = (cIndex!==null)?service.categories[cIndex]:undefined;
    let option = (oIndex!==null)?category.options[oIndex]:undefined;

    switch(name){
      case 'service':
        update=service;
        break;
      case 'category':
        update=category;
        break;
      case 'option':
        update=option;
        break;
      default:
        update=undefined;
        break;
    };

    this.setState({
      opened: true,
      name: name,
      id: id,
      update: update
    })
  }
 
  closeFormDialog = () => {
    this.setState({
      opened: false,
      name: '',
      id: null,
      setStep: undefined,
    })
  }

  render(){  
    const { classes, services, handleSubmit, handleUpdate, removeServices } = this.props;
    const { opened, name, id,  setStep, update } = this.state;
 
    return (
      <div>
        <ServicesList 
          services={services}
          openFormDialog={this.openFormDialog}
          openUpdateFormDialog={this.openUpdateFormDialog}
          removeServices={removeServices}
        />
        {opened && <ServicesFormMain 
                    opened={opened}
                    id={id}
                    name={name} 
                    setStep={setStep}     
                    closeFormDialog={this.closeFormDialog} 
                    update={update}
                    handleSubmit={handleSubmit}
                    handleUpdate={handleUpdate}
                  />}
        
        <Tooltip title="Nova usluga">
          <Fab
            name="new"
            color="primary"
            onClick={this.openFormDialog}
            className={classes.addIcon}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
    )
  }
};

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
  services: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(services)(Services));
