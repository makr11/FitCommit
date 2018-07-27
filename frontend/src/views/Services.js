import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import Forms from '../components/Forms';
import ServicesList from '../components/ServicesList';

class NewService extends React.Component{

  render(){
    
    return (
      <Card>
        <CardHeader
          title="Upis usluge"
        />
        <CardContent>
          <Forms />
        </CardContent>   
        <ServicesList />
      </Card>  
    )
  }
};

export default NewService;