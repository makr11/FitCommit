import React from 'react';
// services containers
import { connect } from 'react-redux';
import { requestServices, removeServices, submitFormService, updateFormService } from '../../actions/servicesActions';
import PropTypes from 'prop-types';
import ServicesList from './containers/ServicesList';
import ServicesFormRouter from './containers/ServicesFormRouter';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class Services extends React.Component{

  state={
    opened: false,
    name: '',
    id: null,
    setStep: undefined,
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

  openUpdateFormDialog = (e) => {
    let id = e.currentTarget.id;
    let name = e.currentTarget.name;

    this.setState({
      opened: true,
      name: name,
      id: id,
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
    const { services } = this.props;
    const { opened, name, id,  setStep } = this.state;
 
    return (
      <div>
        <ServicesList 
          services={services}
          openFormDialog={this.openFormDialog}
          openUpdateFormDialog={this.openUpdateFormDialog}
        />
        {(opened)?<ServicesFormRouter 
                    opened={opened}
                    id={id}
                    name={name} 
                    setStep={setStep}     
                    closeFormDialog={this.closeFormDialog} 
                  />:undefined}
        
        <Tooltip title="Nova usluga">
          <Button
            name="new"
            variant="fab"
            color="primary"
            onClick={this.openFormDialog}
          >
            <AddIcon />
          </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Services);
