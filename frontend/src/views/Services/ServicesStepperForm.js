import React from 'react';
// material ui core
import { withStyles } from '@material-ui/core';
// styles
import { stepperForm } from './servicesStyle'; 
// material ui components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const steps = ['Usluga', 'Kategorija', 'Opcija'];

function ServicesStepperForm(props){
  const { 
    classes,
    open,
    update, 
    activeStep, 
    setStep, 
    getStepContent,
    handleNext, 
    handleBack,
    submit,
    close
  } = props
  
  return (
    <Dialog
      open={open}
      fullWidth={true}
    >
      <DialogContent>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>   
        <div className={classes.formWrapper}>
          {getStepContent(activeStep)}
        </div>
        <div className={classes.formWrapper}>
          <IconButton
            variant="contained" 
            color="primary"
            onClick={handleBack}
            disabled={(activeStep === setStep || update)?true:false}
          >
            <NavigateBeforeIcon/>
          </IconButton>
          <IconButton 
            variant="contained" 
            color="primary" 
            onClick={handleNext}
            disabled={(activeStep === steps.length - 1 || update)?true:false}
          >
            <NavigateNextIcon/>
          </IconButton>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={submit} color="primary">
          Spremi
        </Button>
        <Button onClick={close} color="primary">
          Zatvori
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(stepperForm)(ServicesStepperForm);