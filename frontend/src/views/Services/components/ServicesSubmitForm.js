import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class ServicesFormDialog extends React.Component {

  render() {
    const { classes, handleChange, handleFormSubmit, closeFormDialog, title, service, category, price, arrivals, duration } = this.props;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.closeServiceDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {(service)?service.service + " -> ":""}
            {(category)?category.category + " -> ":""}
          </DialogContentText>
          {(!service)?
          <TextField
            name="service"
            label="Usluga"
            className={classes.textField}
            margin="normal"
            onChange={handleChange}
            defaultValue={(service)?service.service:undefined}
          />:undefined
          }
          {(!category)?
          <TextField
            name="category"
            label="Opcija"
            className={classes.textField}
            margin="normal"
            onChange={handleChange}
            defaultValue={(category)?category.category:undefined}
          />:undefined
          }
          <TextField
            name="arrivals"
            label="Broj dolazaka"
            className={classes.textField}
            type="number"
            margin="normal"
            onChange={handleChange}
            defaultValue={arrivals}
          />
          <TextField
            name="price"
            label="Cijena"
            className={classes.textField}
            type="number"
            margin="normal"
            onChange={handleChange}
            defaultValue={price}
          />
          <TextField
            name="duration"
            label="Trajanje"
            className={classes.textField}
            type="number"
            margin="normal"
            onChange={handleChange}
            defaultValue={duration}
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

export default withStyles(styles)(ServicesFormDialog);
