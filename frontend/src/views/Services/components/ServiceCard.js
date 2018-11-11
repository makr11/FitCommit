import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import OptionsTable from './OptionsTable';
import Editor from '../../../components/Editor';
import { Typography } from '@material-ui/core';

function ServiceCard(props){
  const { service, openFormDialog } = props;

  return (
    <Card >
      <Editor type="service" id={service.id} open={openFormDialog}>
        <CardHeader
          title={service.service}
        />
      </Editor>
      {service.categories.map((category) => {
        return(
          <div key={category.id}>
            <CardContent>
              <Editor type="category" id={category.id} open={openFormDialog}>
                <Typography color="primary" variant="headline">
                  {category.category}
                </Typography>
              </Editor>  
            </CardContent>
            <OptionsTable 
              options={category.options} 
            />
          </div>
        )
      })}
    </Card>
  );
}

export default ServiceCard;