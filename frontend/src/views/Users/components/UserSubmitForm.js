import React from 'react';
// material ui core
import { withStyles } from '@material-ui/core/styles';
// material ui core components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// jss style
import { formStyle } from '../../../assets/jss/users';

class ServicesFormDialog extends React.Component {

  handleChange(e){
    const input = {[e.target.name]: e.target.value};
    this.props.handleChangeInput(input)
  }

  render() {
    const { classes, handleFormInput, handleFormSubmit, closeFormDialog, title } = this.props;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.closeUserDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
            <TextField
                name="first_name"
                label="Ime"
                className={classes.textField}
                margin="normal"
                onChange={handleFormInput}
            />
            <TextField
                name="last_name"
                label="Prezime"
                className={classes.textField}
                margin="normal"
                onChange={handleFormInput}
            />
            <TextField
                name="password"
                label="Lozinka"
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                onChange={handleFormInput}
            />
            <TextField
                name="email"
                label="E-mail"
                type="email"
                className={classes.textField}
                margin="normal"
                onChange={handleFormInput}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeFormDialog} color="primary">
                Zatvori
            </Button>
            <Button onClick={handleFormSubmit} color="primary">
                Spremi
            </Button>
          </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(formStyle)(ServicesFormDialog);
