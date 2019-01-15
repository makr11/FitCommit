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
    first_name, 
    last_name,
    username, 
    password, 
    email, 
    handleInput,
    submit,
    open,
    close 
  } = props;
  return(
    <Dialog
      open={open}
    >
      <DialogContent>
        <TextField
          name="first_name"
          label="Ime"
          value={first_name}
          onChange={handleInput}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          name="last_name"
          label="Prezime"
          value={last_name}
          onChange={handleInput}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          name="username"
          label="Korisničko ime"
          value={username}
          onChange={handleInput}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          name="password"
          label="Lozinka"
          type="password"
          input={password}
          onChange={handleInput}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          name="email"
          label="E-mail"
          type="email"
          input={email}
          onChange={handleInput}
          className={classes.emailField}
          margin="normal"
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