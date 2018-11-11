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
import { servicesFormStyle } from '../../../assets/jss/services';

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
          {(service && !category)?
          <TextField
            name="service"
            label="Usluga"
            className={classes.textField}
            margin="normal"
            onChange={handleChange}
            defaultValue={service.service}
          />:undefined
          }
          {(category && !arrivals)?
          <TextField
            name="category"
            label="Opcija"
            className={classes.textField}
            margin="normal"
            onChange={handleChange}
            defaultValue={category.category}
          />:undefined
          }
          {(arrivals)?
          <div>
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
          </div>:undefined
        }
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

export default withStyles(servicesFormStyle)(ServicesFormDialog);
