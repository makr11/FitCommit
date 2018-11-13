import React from 'react';
import ServiceForm from '../components/ServiceForm';
import CategoryForm from '../components/CategoryForm';
import OptionForm from '../components/OptionForm';
import ServicesStepperForm from '../components/ServicesStepperForm';
import FormDialog from '../../../components/FormDialog';

class ServicesFormRouter extends React.Component {
  constructor(props){
    super(props)
    this.state={     
        activeStep: this.props.setStep,    
    }   
  }

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <ServiceForm 
            service={this.state.service}
            handleInput={this.handleFormInput}
          />
        );
      case 1:
        return (
          <CategoryForm />
        );
      case 2:
        return (
          <OptionForm />
        );
      default:
        return 'Uknown stepIndex';
    }
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleFormInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submit = (e) => {
    e.preventDefault();
    console.log('yes');
  }

  render() {
    const { opened, closeFormDialog, name, setStep } = this.props;
    const {
      activeStep,
    } = this.state;
    
    return (
      <FormDialog
        activeStep={activeStep}
        open={opened}
        close={closeFormDialog}
        form={
          (this.props.setStep!==undefined)?          
          <ServicesStepperForm
            activeStep={activeStep}
            setStep={setStep}
            getStepContent={this.getStepContent}
            handleNext={this.handleNext}
            handleBack={this.handleBack}
          />:(name==="service")?
          <ServiceForm 
          />:(name==="category")?
          <CategoryForm
          />:(name==="option")?
          <OptionForm
          />:undefined}
      >
      </FormDialog>
    )
  };
};

export default ServicesFormRouter;