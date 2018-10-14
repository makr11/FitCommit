import React from 'react';
import Paper from '@material-ui/core/Card';
import ServicesList from './containers/ServicesList';

class Services extends React.Component{

  render(){
    
    return (
      <Paper> 
        <ServicesList />
      </Paper>  
    )
  }
};

export default Services;