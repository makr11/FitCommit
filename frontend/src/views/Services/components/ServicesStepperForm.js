import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const steps = ['Usluga', 'Kategorija', 'Opcija'];

function ServicesStepperForm(props){
  const { activeStep, setStep, getStepContent, handleNext, handleBack } = props
  return (
    <div >
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>    
      <div>
        {getStepContent(activeStep)}
        <div>
          <IconButton
            disabled={activeStep === setStep}
            onClick={handleBack}
            color="primary"
          >
            <NavigateBeforeIcon/>
          </IconButton>
          <IconButton 
            variant="contained" 
            color="primary" 
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            <NavigateNextIcon/>
          </IconButton>
        </div>
      </div>  
    </div>
  )
}

export default ServicesStepperForm;