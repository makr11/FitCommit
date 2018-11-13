import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

function FormDialog(props){
  const { form, open, close } = props;

  return (
    <Dialog
      open={open}
    >
      <DialogContent>
        {form}
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          Zatvori
        </Button>
      </DialogActions>
    </Dialog>
  )   
}

export default FormDialog;