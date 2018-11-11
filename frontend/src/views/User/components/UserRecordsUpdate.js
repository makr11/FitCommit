import React from 'react';
// material ui core
import { withStyles } from '@material-ui/core/styles';
// material ui core components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
// app helper functions
import { dateFormat } from '../../../assets/js/functions.js';
// jss style
import { updateRecordFormStyle } from '../../../assets/jss/userProfile';

class ServicesFormDialog extends React.Component {

  state = {
    nettPrice: undefined,
    discount: undefined,
  }

  handleChange(e){
    const input = {[e.target.name]: e.target.value};
    this.props.handleChangeInput(input)
  };

  handleRecordInput = (e) => {
    if(e.target.id==="discount"){
      let nettPrice
      let discount
      if(e.target.value){
        let percentage = parseInt(e.target.value, 10)
        discount = 1 - (percentage / 100);
        nettPrice = this.props.record.price * discount;
      }else{
        discount = 1;
        nettPrice = this.props.record.price * discount;
      }
      this.setState({
        discount: e.target.value,
        nettPrice: nettPrice,
      });
    }else{
      this.setState({
        [e.target.id]: e.target.value,
      });
    }
  };

  render() {
    console.log(this.state);
    const { classes, record, closeRecordDialog } = this.props;
    const { nettPrice } = this.state;
    return (
      <Dialog
        open={this.props.open}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {"Usluga korisnika: " + record.user}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"Usluga: " + record.service + " (" + record.category + ")"}
          </DialogContentText>
          <TextField
            id="started"
            label="Datum"
            type="date"
            defaultValue={dateFormat(record.started)}
            InputLabelProps={{
              shrink: true,
            }}
            className={classes.textField}
            onChange={this.handleRecordInput}
          />
          <TextField
            id="ends"
            label="Datum"
            type="date"
            defaultValue={dateFormat(record.ends)}
            InputLabelProps={{
              shrink: true,
            }}
            className={classes.textField}
            onChange={this.handleRecordInput}
          />
          <TextField
            id="onHold"
            label="Dani zamrzavanja"
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            onChange={this.handleRecordInput}
          />
          <TextField
            id="addArrivals"
            label="Dodaj dolaske"
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            onChange={this.handleRecordInput}
          />
          <DialogContentText>
            {"Promijeni iznos popusta: " + record.price + " kn"}
          </DialogContentText>
          <TextField
            label="Popust"
            id="discount"
            defaultValue={record.discount}
            className={classes.textField}
            onChange={this.handleRecordInput}
            InputProps={{
              endAdornment: (
                <InputAdornment variant="filled" position="end">
                  %
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Cijena sa popustom"
            id="nett_price"
            className={classes.textField}
            defaultValue={record.nett_price}
            value={nettPrice}
            InputProps={{
              endAdornment: (
                <InputAdornment variant="filled" position="end">
                  Kn
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRecordDialog} color="primary">
            Zatvori
          </Button>
          <Button color="primary">
            Spremi
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(updateRecordFormStyle)(ServicesFormDialog);
