import React from 'react';
// react select module
import Select from 'react-select';
// material ui core components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// jss
import { withStyles } from '@material-ui/core'
import { arrivalsSelect } from '../arrivalsStyle.js'
 
function ArrivalsSelect(props){

  const { selectedDate,
          setDate,
          selectedUser, 
          selectedRecord, 
          usersOpt, 
          recordsOpt, 
          selectUser, 
          selectRecord, 
          submitForm,
          classes } = props;
  
  return(
    <React.Fragment>
      <Grid item xs={12} md={3}>
        <TextField
          id="date"
          label="Datum"
          type="date"
          defaultValue={selectedDate}
          InputLabelProps={{
          shrink: true,
          }}
          onChange={setDate}
          className={classes.date}
        />
      </Grid>
      <Grid item xs={12} md={9}>
        <form onSubmit={submitForm} noValidate autoComplete="off" className={classes.root}> 
          <Select
            value={selectedUser}
            onChange={selectUser}
            options={usersOpt}
            placeholder={"Izaberi člana"}
            className={classes.select}
          />
          <Select
            value={selectedRecord}
            onChange={selectRecord}
            options={recordsOpt}
            placeholder={"Izaberi uslugu"}
            className={classes.select}
          />
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            className={classes.button}
          >
            Izaberi
          </Button>
        </form>
      </Grid>
    </React.Fragment>
  )
}


export default withStyles(arrivalsSelect)(ArrivalsSelect);
