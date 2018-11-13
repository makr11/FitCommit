import React from 'react';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

const steps = ['Usluga', 'Kategorija', 'Opcija'];

function ServicesStepperForm(props){
  const { activeStep, setStep, getStepContent, handleNext, handleBack } = props
  console.log(props);
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
        {activeStep === steps.length ? (
          <div>
            <Typography></Typography>
          </div>
        ) : (
            <div>
              {getStepContent(activeStep)}
              <div>
                <Button
                  disabled={activeStep === setStep}
                  onClick={handleBack}
                >
                  Natrag
              </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Spremi' : 'Sljedeći'}
                </Button>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default ServicesStepperForm;