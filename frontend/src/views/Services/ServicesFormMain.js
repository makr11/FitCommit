import React from 'react';
// app components
import { ServiceForm, CategoryForm, OptionForm } from './ServiceForm';
import ServicesStepperForm from './ServicesStepperForm';
// material ui components
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { emptyFields } from '../../assets/js/formDataValidation';


const formState = (update, name) => {
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
  }else if(name==="new"){
    return (
      {
        service: '',
        category: '',
        duration: '',
        arrivals: '',
        price: '',
      }
    )
  }else if(name==="service"){
    return(
      {
        category: '',
        duration: '',
        arrivals: '',
        price: '',
      }
    )
  }else if(name==="category"){
    return(
      {
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
      form: formState(props.update, props.name),
      formError: {
        service: false,
        category: false,
        duration: false,
        arrivals: false,
        price: false,
      },
      activeStep: props.setStep,
      warning: false,
      message: "",
    }
  }

  getStepContent = (stepIndex) => {
    const { 
      service, 
      category, 
      duration, 
      arrivals, 
      price,
    } = this.state.form;
  
    switch (stepIndex) {
      case 0:
        return (
          <ServiceForm
            service={service}
            handleInput={this.handleFormInput}
            error={this.state.formError.service}
          />
        );
      case 1:
        return (
          <CategoryForm
            category={category}
            handleInput={this.handleFormInput}
            error={this.state.formError.category}
          />
        );
      case 2:
        return (
          <OptionForm
            duration={duration}
            arrivals={arrivals}
            price={price}
            handleInput={this.handleFormInput}
            formError={this.state.formError}
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

  checkSubmit = (e) => {
    e.preventDefault();
    
    let snackbar_message = "Potrebno je popuniti sva polja";
    let validate = emptyFields(this.state.form)

    if(validate['hasEmptyFields']){
      this.setState({
        ...this.state,
        formError: {
          ...validate['objEmptyFields']
        },
        warning: validate['hasEmptyFields'],
        message: (validate['hasEmptyFields'])?snackbar_message:""
      })
    }else{
      this.submit(e)
    };
  }

  submit = (e) => {
    e.preventDefault()
    const { id, name, update, handleSubmit, handleUpdate, closeServicesForm } = this.props;
    const { service, category, duration, price, arrivals } = this.state.form;
    closeServicesForm();
    const lead = { id, name, service, category, duration, price, arrivals };
    if (update !== undefined) {
      return (handleUpdate(lead))
    } else {
      return (handleSubmit(lead))
    }
  };

  closeWarning = () => {
    this.setState({
      ...this.state,
      warning: false,
      message: ""
    })
  }

  render() {
    const { 
      open, 
      closeServicesForm, 
      setStep,
      update 
    } = this.props;
    const { 
      activeStep,
      warning,
      message
    } = this.state;
    
    return (
      <React.Fragment>
        <ServicesStepperForm
          open={open}
          update={update}
          activeStep={activeStep}
          setStep={setStep}
          getStepContent={this.getStepContent}
          handleNext={this.handleNext}
          handleBack={this.handleBack}
          submit={this.checkSubmit}
          close={closeServicesForm}
        />
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={warning}
          onClose={this.closeWarning}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.closeWarning}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </React.Fragment>
    )
  };
};

export default ServicesFormMain;