import React from 'react';
import ServiceForm from '../ServiceForm/ServiceForm';
import CategoryForm from '../CategoryForm/CategoryForm';
import OptionForm from '../OptionForm/OptionForm';
import ServicesStepperForm from '../ServicesStepperForm/ServicesStepperForm';
import FormDialog from '../../../components/FormDialog';

const formState = (update) => {
  if(update){
    if (update.service) {
      return (
        { service: update.service }
      )
    } else if (update.category) {
      return (
        { category: update.category }
      )
    } else if (update.duration) {
      return (
        {
          duration: update.duration,
          price: update.price,
          arrivals: update.arrivals,
        }
      )
    } 
  }else{
    return (
      {
        service: '',
        category: '',
        duration: '',
        arrivals: '',
        price: '',
      }
    )
  }
}

class ServicesFormMain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: props.setStep,
      form: formState(props.update)
    }
  }

  getStepContent = (stepIndex) => {
    const { service, category, duration, arrivals, price } = this.state.form;
  
    switch (stepIndex) {
      case 0:
        return (
          <ServiceForm
            service={service}
            handleInput={this.handleFormInput}
          />
        );
      case 1:
        return (
          <CategoryForm
            category={category}
            handleInput={this.handleFormInput}
          />
        );
      case 2:
        return (
          <OptionForm
            duration={duration}
            arrivals={arrivals}
            price={price}
            handleInput={this.handleFormInput}
          />
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
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  };

  submit = () => {
    const { id, name, update, handleSubmit, handleUpdate, closeFormDialog } = this.props;
    const { service, category, duration, price, arrivals } = this.state.form;
    closeFormDialog();
    const lead = { id, name, service, category, duration, price, arrivals }
    if (update !== undefined) {
      return (handleUpdate(lead))
    } else {
      return (handleSubmit(lead))
    }
  };

  render() {
    const { opened, closeFormDialog, name, setStep } = this.props;
    const { activeStep } = this.state;
    const { service, category, duration, price, arrivals } = this.state.form;
  
    return (
      <FormDialog
        activeStep={activeStep}
        open={opened}
        submit={this.submit}
        close={closeFormDialog}
      >
        {(this.props.setStep !== undefined) ?
        <ServicesStepperForm
          activeStep={activeStep}
          setStep={setStep}
          getStepContent={this.getStepContent}
          handleNext={this.handleNext}
          handleBack={this.handleBack}
        /> :
        (name === "service") ?
        <ServiceForm
          service={service}
          handleInput={this.handleFormInput}
          submit={this.submit}
        /> :
        (name === "category") ?
        <CategoryForm
          category={category}
          handleInput={this.handleFormInput}
          submit={this.submit}
        /> :
        (name === "option") ?
        <OptionForm
          duration={duration}
          arrivals={arrivals}
          price={price}
          handleInput={this.handleFormInput}
          submit={this.submit}
        /> : undefined}
      </FormDialog>
    )
  };
};

export default ServicesFormMain;