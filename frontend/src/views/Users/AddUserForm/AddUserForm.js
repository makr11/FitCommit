import React from 'react';
//material ui core
import { withStyles } from '@material-ui/core';
//styles
import { addUserForm } from '../usersStyle';
import TextField from '@material-ui/core/TextField';

function NewUserForm(props){
  const { classes, first_name, last_name, username, password, email, handleInput } = props;
  return(
    <div>
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
    </div>
  )
}

export default withStyles(addUserForm)(NewUserForm);