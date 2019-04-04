import React from 'react';
// material ui core
import { withStyles } from '@material-ui/core';
// styles
import { addUserForm } from './usersStyle';
// material ui components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

function AddUserForm(props){
  const { 
    classes, 
    handleInput,
    submit,
    open,
    close
  } = props;

  return(
    <Dialog
      open={open}
      onClose={close}
    >
      <DialogContent>
        <TextField
          error={props.userFormError.first_name}
          name="first_name"
          label="Ime"
          value={props.userForm.first_name}
          onChange={handleInput}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          error={props.userFormError.last_name}
          name="last_name"
          label="Prezime"
          value={props.userForm.last_name}
          onChange={handleInput}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          error={props.userFormError.username}
          name="username"
          label="Korisničko ime"
          value={props.userForm.username}
          onChange={handleInput}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          error={props.userFormError.password}
          name="password"
          label="Lozinka"
          type="password"
          value={props.userForm.password}
          onChange={handleInput}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          error={props.userFormError.email}
          name="email"
          label="E-mail"
          type="email"
          value={props.userForm.email}
          onChange={handleInput}
          className={classes.emailField}
          margin="normal"
          helperText={props.userFormErrorText.email}
        />
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

export default withStyles(addUserForm)(AddUserForm);