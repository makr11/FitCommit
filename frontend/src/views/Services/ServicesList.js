import React from 'react';
// prop types check
import PropTypes from "prop-types";
// material ui core
import { withStyles } from "@material-ui/core";
// material ui core
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// app services components
import CategoryTabs from './CategoryTabs';
import Editor from '../../components/Editor';

const styles = (theme) => ({
  headingContainer: {
    backgroundColor: "#3f51b5",
    marginTop: theme.spacing.unit * 3,
  },
  heading: {
    marginLeft: theme.spacing.unit * 3,
    color: "#ffff"
  },
  card: {
    flexGrow: 1,
		overflowX: 'auto',
 	},
})

function ServicesList (props){
  const { 
    classes,
    services, 
    openNewServicesForm, 
    openEditServicesForm, 
    removeServices,
  } = props; 
  
  return(  
    <React.Fragment>
      <Grid container spacing={24}>
      {services.map((service) => {
        return(
        <Grid item xs={12} key={service.id}> 
          <Paper
          className={classes.headingContainer}
          >
            <Editor 
            name="service" 
            id={service.id} 
            open={openNewServicesForm} 
            update={openEditServicesForm}
            del={removeServices}
            > 
             <Typography
             variant="h6" 
             align="left" 
             color="inherit" 
             className={classes.heading}
             >
              {service.service}
             </Typography>
            </Editor>
          </Paper>
          <Paper className={classes.card}>
            <CategoryTabs
              service={service}
              openNewServicesForm={openNewServicesForm} 
              openEditServicesForm={openEditServicesForm} 
              removeServices={removeServices}
            />
          </Paper>
        </Grid>
          )
        })}
      </Grid>
    </React.Fragment>
  )
};

ServicesList.propTypes = {
  services: PropTypes.array.isRequired,
  openNewServicesForm: PropTypes.func.isRequired,
  openEditServicesForm: PropTypes.func.isRequired,
}

export default withStyles(styles)(ServicesList);