import React from 'react';
// material ui core
import { withStyles } from '@material-ui/core/styles';
// jss styles
import { addRecord } from './userStyle'
// material ui core components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';

function AddRecord (props) {
  const {
    classes, 
    service, 
    categories, 
    category, 
    options, 
    option, 
    services, 
    handleSelectService, 
    handleInput, 
    price, 
    discount,
    nett_price, 
    paid, 
    open, 
    close,
    submit,
    addRecordError
  } = props;
  
  return(
    <Dialog
        open={open}   
        onClose={close}
    >
      <DialogContent>
        <Grid container spacing={24}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <FormControl error={addRecordError.service}>
                <FormLabel>Usluga</FormLabel>
                <RadioGroup
                  name="service"
                  value={service.service}
                  onChange={handleSelectService}
                >
                {services.map(service => {
                  return(
                    <FormControlLabel
                    key={service.id}
                    value={service.service}
                    control={<Radio />}
                    label={service.service} />
                  )
                })}
                </RadioGroup>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
            <FormControl error={addRecordError.category}>
              <FormLabel>Kategorija</FormLabel>
                <RadioGroup
                  name="category"
                  value={category.category}
                  onChange={handleSelectService}
                >
                {categories.map(category => {
                  return(
                    <FormControlLabel
                    key={category.id}
                    value={category.category}
                    control={<Radio />}
                    label={category.category} />
                  )
                })}
                </RadioGroup>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              <FormControl error={addRecordError.option}>
                <FormLabel>Cijena</FormLabel>
                <RadioGroup
                  name="option"
                  aria-label="option"
                  value={(option.id)?option.id.toString():""}
                  onChange={handleSelectService}
                >
                {options.map(option => {
                  return(
                    <FormControlLabel
                      key={option.id}
                      value={option.id.toString()}
                      control={<Radio />}
                      label={option.price + " kn (" + option.arrivals + " dolazaka/" + option.duration + " dana)"}
                    />
                  )
                })}
                </RadioGroup>
              </FormControl>
            </Paper>
          </Grid>
          
          <FormControl className={classes.form}>
            <Grid container spacing={8}>
              <Grid item xs>
                <TextField
                  error={addRecordError.price}
                  label="Cijena"
                  name="price"
                  className={classes.textField}
                  margin="normal"
                  value={price}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment variant="filled" position="end">
                        Kn
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  error={addRecordError.discount}
                  label="Popust"
                  name="discount"
                  className={classes.textField}
                  margin="normal"
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
              </Grid>
              <Grid item xs>
                <TextField
                  error={addRecordError.nett_price}
                  label="Cijena sa %"
                  id="nett_price"
                  className={classes.textField}
                  margin="normal"
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
              <Grid item xs> 
                <FormControlLabel
                  control={
                    <Checkbox
                    name="paid"
                    checked={paid}
                    onChange={handleInput}
                    />
                  }
                  label={(paid)?'Plaćeno':'Nije plaćeno'}
                />
              </Grid>
            </Grid>
          </FormControl>          
        </Grid>
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

export default withStyles(addRecord)(AddRecord);