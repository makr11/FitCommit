import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

function FormDialog(props){
  const { children, open, submit, close } = props;

  return (
    <Dialog
      open={open}
      onClose={close}
    >
      <DialogContent>
        {children}
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

export default FormDialog;