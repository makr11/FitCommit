import React from 'react';
// services containers
import { connect } from 'react-redux';
import { requestServices, removeServices, submitFormService, updateFormService } from '../../actions/servicesActions';
import PropTypes from 'prop-types';
import ServicesList from './containers/ServicesList';
import FormDialog from '../../components/FormDialog';

class Services extends React.Component{

  state={
    opened: false,
  }

  openFormDialog = () => {
    this.setState({opened: true})
  };

  closeFormDialog = () => {
    this.setState({opened: false})
  }

  handleFormInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      componentUpdate: false
    });
  };

  render(){  
    const { services } = this.props;

    return (
      <div>
        <ServicesList 
          services={services}
          openFormDialog={this.openFormDialog}
        />
        <FormDialog
          open={this.state.opened}
          close={this.closeFormDialog}        
          handleFormInput={this.handleFormInput}
        />
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
