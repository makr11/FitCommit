import React from 'react';
// material ui core
import { withStyles} from '@material-ui/core';
// styles
import { editRecord } from '../userStyle';
// material ui core components
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
// app functions
import { dateFormatView } from '../../../assets/js/functions';

function EditRecord(props){
  const { 
    classes,
    started, 
    ends, 
    freeze, 
    freeze_started,
    freezeDays,
    freeze_ended,
    nett_price, 
    discount, 
    paid,
    handleInput,
    handleCheckBox } = props

    console.log(classes)

  return (
    <div>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              id="paid"
              checked={paid}
              onChange={handleCheckBox}
            />
          }
          label="Plaćeno"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="freeze"
              checked={freeze}
              onChange={handleCheckBox}
            />
          }
          label={(freeze)?"Članarina zamrznuta":"Zamrznuti članarinu"}
        />
      </FormGroup>
      
      {(freeze)?
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Typography variant="body1" color="inherit">
            Od: {dateFormatView(freeze_started)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" color="inherit">
            Do: {dateFormatView(freeze_ended)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="freezeDays"
            label="Dani"
            className={classes.textField}
            value={freezeDays}
            onChange={handleInput} 
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="freeze_ended"
            label="Datum"
            className={classes.textField}
            type="date"
            value={freeze_ended}
            onChange={handleInput} 
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>:undefined     
      }
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <TextField
            name="started"
            label="Početak"
            className={classes.textField}
            type="date"
            value={started}         
            onChange={handleInput}
          />
          <TextField
            name="ends"
            label="Istek"
            className={classes.textField}
            type="date"
            value={ends}
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="discount"
            label="Popust"
            className={classes.textField}
            value={discount}
            onChange={handleInput}
            InputProps={{
              endAdornment: (
                <InputAdornment variant="filled" position="end">
                  %
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="nett_price"
            label="Cijena sa popustom"
            className={classes.textField}
            value={nett_price}
            InputProps={{
              endAdornment: (
                <InputAdornment variant="filled" position="end">
                  Kn
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid> 
    </div> 
  );
}

export default withStyles(editRecord)(EditRecord);