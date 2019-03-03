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
}

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
          <Typography variant="body1">
            Datum rođenja:
            <br/>11.09.1989
          </Typography>
          <Divider/>
          <Typography variant="body1">
            Član od:
            <br/>25.12.2018
          </Typography>         
          <Divider/>
          <Typography variant="body1">
            Mobitel:
            <br/>0915322520
          </Typography>
          <Divider/>
          <Typography variant="body1">
            E-mail:
            <br/>{user.email}
          </Typography>
          <Divider/>
          <Typography variant="body1">
            Br. usluga:
            <br/>{records}
          </Typography>
        </Paper>
      </Grid>
    </React.Fragment>
  )
}

export default withStyles(styles)(Profile);