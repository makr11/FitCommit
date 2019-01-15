import React from 'react';
// prop types check
import PropTypes from "prop-types";
// material ui core
import Grid from '@material-ui/core/Grid';
// app services components
import ServiceCard from './ServiceCard';

function ServicesList(props){
  const { 
    services, 
    openNewServicesForm, 
    openEditServicesForm, 
    removeServices 
  } = props;

  return(  
    <Grid container spacing={24}>
    {services.map((service, sIndex) => {
      return(
        <ServiceCard 
          service={service} 
          key={service.id}
          openNewServicesForm={openNewServicesForm}
          openEditServicesForm={openEditServicesForm}
          sIndex={sIndex}
          removeServices={removeServices}
        />
      )
    })}
    </Grid>
  )
};

ServicesList.propTypes = {
  services: PropTypes.array.isRequired,
  openNewServicesForm: PropTypes.func.isRequired,
  openEditServicesForm: PropTypes.func.isRequired,
}

export default ServicesList;