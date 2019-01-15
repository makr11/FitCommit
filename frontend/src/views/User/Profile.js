import React from 'react';
// material ui core
import { withStyles } from '@material-ui/core';
// material ui components
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
        <Paper className={classes.paper}>
          <Typography variant="body2">
            {user.first_name + " " + user.last_name}
          </Typography>
          <Divider/>
          <Typography variant="caption">
            11.09.1989
          </Typography>
          <Typography variant="caption">
            0915322520
          </Typography>
          <Typography variant="caption">
            {user.email}
          </Typography>
          <Typography variant="caption">
            25.12.2018
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <div >
          <div style={{display: "inline-block", margin: "4px"}}> 
            <Typography variant="body2">
              Član od
            </Typography>
            <Typography variant="body2">
              25.12.2018
            </Typography>
          </div>
          <div style={{display: "inline-block", margin: "4px"}}>
          <Typography variant="body2">
              Usluge
            </Typography>
            <Typography variant="body2">
              {records}
            </Typography>
          </div>
        </div>
      </Grid>
    </React.Fragment>
  )
}

export default withStyles(styles)(Profile);