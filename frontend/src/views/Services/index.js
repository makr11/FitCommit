import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import ServicesForm from './containers/ServicesForm';
import ServicesList from './containers/ServicesList';

class Services extends React.Component{

  render(){
    
    return (
      <Card>
        <CardHeader
          title="Upis usluge"
        />
        <CardContent>
        <ServicesForm />
        </CardContent>   
        <ServicesList />
      </Card>  
    )
  }
};

export default Services;