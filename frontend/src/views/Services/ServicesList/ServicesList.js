import React from 'react';
// prop types check
import PropTypes from "prop-types";
// material ui core
import Grid from '@material-ui/core/Grid';
// app services components
import ServiceCard from '../ServiceCard/ServiceCard';

function ServicesList(props){
  const { services, openFormDialog, openUpdateFormDialog, removeServices } = props;

  return(  
    <Grid container spacing={24}>
    {services.map((service, sIndex) => {
      return(
        <ServiceCard 
          service={service} 
          key={service.id}
          openFormDialog={openFormDialog}
          openUpdateFormDialog={openUpdateFormDialog}
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
  openFormDialog: PropTypes.func.isRequired,
  openUpdateFormDialog: PropTypes.func.isRequired,
}

export default ServicesList;