import React from 'react';
// redux
import { connect } from 'react-redux';
import { requestServices, removeServices, submitFormService, updateFormService } from '../../store/actions/servicesA';
// app components
import ServicesLayout from './ServicesLayout';
import ServicesFormMain from './ServicesFormMain';

class Services extends React.Component{

  state={
    open: false,
    name: '',
    id: null,
    setStep: undefined,
    update: undefined,
  };

  openNewServicesForm = (e) => {
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
      open: true,
      name: name,
      id: id,
      setStep: setStep,
    })
  };

  /*Options sends name=undefined beacuse name isn't accessible in lists*/
  openEditServicesForm = (e) => {
    const {
      service,
      category,
      option 
    } = this.props;
    let setStep
    let update 
    let id = e.currentTarget.id;
    let name = e.currentTarget.name;
    switch(name){
      case 'service':
        update=service[id];
        setStep=0;
        break;
      case 'category':
        update=category[id];
        setStep=1;
        break;     
      case undefined:
        update=option[id];
        name="option";
        setStep=2;
        break;
      default:
        update=undefined;
        break;
    };

    this.setState({
      open: true,
      name: name,
      id: id,
      update: update,
      setStep: setStep
    })
  };
 
  closeServicesForm = () => {
    this.setState({
      open: false,
      name: '',
      id: null,
      setStep: undefined,
      update: undefined,
    })
  };

  render(){  
    const {  
      services, 
      handleSubmit, 
      handleUpdate, 
      removeServices 
    } = this.props;
    const { 
      open, 
      name, 
      id,  
      setStep, 
      update,
    } = this.state;
    
    return (
      <React.Fragment>
        <ServicesLayout
          services={services}
          openNewServicesForm={this.openNewServicesForm}
          openEditServicesForm={this.openEditServicesForm}
          removeServices={removeServices}
          closeMenu={this.closeMenu}
        />
        {open && <ServicesFormMain 
                    open={open}
                    id={id}
                    name={name} 
                    setStep={setStep}     
                    closeServicesForm={this.closeServicesForm} 
                    update={update}
                    handleSubmit={handleSubmit}
                    handleUpdate={handleUpdate}
                  />} 
      </React.Fragment>
    )
  }
};

const mapStateToProps = state => {
  return {
    services: state.servicesReducer.services,
    service: state.servicesReducer.service,
    category: state.servicesReducer.category,
    option: state.servicesReducer.option,
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

export default connect(mapStateToProps, mapDispatchToProps)(Services);
