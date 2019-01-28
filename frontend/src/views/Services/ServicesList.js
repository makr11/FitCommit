import React from 'react';
// prop types check
import PropTypes from "prop-types";
// material ui core
import { withStyles } from "@material-ui/core";
// styles
import { serviceCard } from "./servicesStyle";
// material ui core
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// app services components
import CategoryTabs from './CategoryTabs';
import Editor from '../../components/Editor';

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
          <Paper className={classes.card}>
            <Editor 
              name="service" 
              id={service.id} 
              open={openNewServicesForm} 
              update={openEditServicesForm}
              del={removeServices}
            >
              <Typography variant="h5" style={{display: "inline-block"}}>
                {service.service}
              </Typography>
            </Editor>
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

export default withStyles(serviceCard)(ServicesList);