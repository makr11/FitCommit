import React from 'react';
// material ui core styles
// material ui core components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CustomInput from './CustomInput';

function FormDialog(props){
  const { close, open } = props;
  return (
    <Dialog
      open={open}
    >
      <DialogContent>
        <CustomInput 

        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          Zatvori
        </Button>
        <Button  color="primary">
          Spremi
        </Button>
      </DialogActions>
    </Dialog>
  );  
}

export default FormDialog;
