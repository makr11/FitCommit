import React from 'react';
// material ui core
import { withStyles } from '@material-ui/core';
// material ui components
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// app components
import ViewElementsHeading from '../../components/ViewElementsHeading';

const styles = {
  paper: {
    textAlign: "center"
  }
};

const div = {
  padding: "10px 20px 10px 20px",
};

const divWNum = {
  display: "flex",
  padding: "10px 20px 10px 20px",
  justifyContent: "space-between"
};

function Profile(props){
  const { classes, user, records } = props;
  return(
    <React.Fragment>
      <Grid item xs={3}>
        <ViewElementsHeading
        title="Osnovni podaci"
        style={{marginTop: "0px"}}
        />
        <Paper className={classes.paper}>
          <div style={div}>
            <Typography variant="body2" align="left">
              Broj iskaznice:
            </Typography>
            <Typography variant="body1">
              {user.IDUser}
            </Typography> 
          </div>
          <Divider/>
          <div style={div}>
            <Typography variant="body2" align="left">
              Datum rođenja:
            </Typography>
            <Typography variant="body1">
              {user.birth_date}
            </Typography> 
          </div>
          <Divider/>
          <div style={div}>
            <Typography variant="body2" align="left">
              Datum upisa:
            </Typography>
            <Typography variant="body1">
              {user.date_joined}
            </Typography> 
          </div>  
          <Divider/> 
          <div style={div}>
            <Typography variant="body2" align="left">
              Adresa:
            </Typography>
            <Typography variant="body1">
              {user.address}
            </Typography> 
          </div>
          <Divider/>
          <div style={div}>
            <Typography variant="body2" align="left">
              Grad:
            </Typography>
            <Typography variant="body1">
              {user.city}
            </Typography> 
          </div>
        </Paper> 

        <ViewElementsHeading
          title="Kontakt"
        />
        <Paper className={classes.paper}>
          <div style={div}>
            <Typography variant="body2" align="left">
              Broj telefona:
            </Typography>
            <Typography variant="body1">
              {user.fix_phone}
            </Typography> 
          </div>
          <Divider/>
          <div style={div}>
            <Typography variant="body2" align="left">
              Broj mobitela:
            </Typography>
            <Typography variant="body1">
              {user.phone}
            </Typography> 
          </div>
          <Divider/>
          <div style={div}>
            <Typography variant="body2" align="left">
              E-mail:
            </Typography>
            <Typography variant="body1">
              {user.email}
            </Typography> 
          </div>
        </Paper>

        <ViewElementsHeading
          title="Usluge"
        />
        <Paper className={classes.paper}>
          <div style={divWNum}>
            <Typography variant="body2" align="left">
              Ukupni dug:
            </Typography>
            <Typography variant="body1" align="right">
              {user.debt} kn
            </Typography>
          </div>
          <Divider/>
          <div style={divWNum}>
            <Typography variant="body2" align="left">
              Broj kupljenih usluga:
            </Typography>
            <Typography variant="body1" align="right">
              {records}
            </Typography>
          </div>
        </Paper>  
      </Grid>
    </React.Fragment>
  )
}

export default withStyles(styles)(Profile);