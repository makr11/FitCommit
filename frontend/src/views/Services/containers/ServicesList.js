import React from 'react';
import ServiceCard from '../components/ServiceCard';

function ServicesList(props){
  const { services, openFormDialog, openUpdateFormDialog } = props;

  return(  
    <div>
    {services.map((service) => {
      return(
        <ServiceCard 
          service={service} 
          key={service.id}
          openFormDialog={openFormDialog}
          openUpdateFormDialog={openUpdateFormDialog}
        />
      )
    })}
    </div>
  )
};

export default ServicesList;