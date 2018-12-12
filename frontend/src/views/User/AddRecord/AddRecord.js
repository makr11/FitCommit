import React from 'react';
// material ui core
import { withStyles } from '@material-ui/core/styles';
// material ui core components
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
// jss styles
import { addRecordStyle } from '../../../assets/jss/userProfile'

function AddRecord (props) {

  const { 
    service, 
    categories, 
    category, 
    options, 
    option, 
    classes, 
    services, 
    handleSelectService, 
    handleInput, 
    price, 
    discount,
    nett_price, 
    paid } = props;
  
  return(
    <Grid container spacing={24}>
      <Grid item xs>
        <Paper className={classes.paper}>
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
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper className={classes.paper}>
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
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper className={classes.paper}>
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
        </Paper>
      </Grid>
      
      <FormControl className={classes.form}>
        <TextField
          label="Cijena"
          name="price"
          className={classes.textField}
          value={price}
          InputProps={{
            endAdornment: (
              <InputAdornment variant="filled" position="end">
                Kn
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Popust"
          name="discount"
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
          label="Cijena sa %"
          id="nett_price"
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
      </FormControl>          
    </Grid>
  ) 
}

export default withStyles(addRecordStyle)(AddRecord);