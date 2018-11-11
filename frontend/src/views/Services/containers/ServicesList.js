import React from 'react';
import ServiceCard from '../components/ServiceCard';

function ServicesList(props){
  const { services, openFormDialog } = props;

  return(  
    <div>
    {services.map((service, serviceIndex) => {
      return(
        <ServiceCard 
          service={service} 
          index={serviceIndex} 
          key={service.id}
          openFormDialog={openFormDialog}
        />
      )
    })}
    </div>
  )
};

export default ServicesList;