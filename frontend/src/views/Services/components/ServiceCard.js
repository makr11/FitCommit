import React from 'react';
// prop types check
import PropTypes from 'prop-types';
// material ui core components
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
// app components
import OptionsTable from './OptionsTable';
import Editor from '../../../components/Editor';

function ServiceCard(props){
  const { service, openFormDialog, openUpdateFormDialog } = props;

  return (
    <Card >
      <Editor name="service" id={service.id} open={openFormDialog} update={openUpdateFormDialog}>
        <CardHeader
          title={service.service}
        />
      </Editor>
      {service.categories.map((category) => {
        return(
          <div key={category.id}>
            <CardContent>
              <Editor name="category" id={category.id} open={openFormDialog} update={openUpdateFormDialog}>
                <Typography variant="title">
                  {category.category}
                </Typography>
              </Editor>  
            </CardContent>
            <OptionsTable 
              options={category.options} 
              openFormDialog={openFormDialog}
              openUpdateFormDialog={openUpdateFormDialog}
            />
          </div>
        )
      })}
    </Card>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.object.isRequired,
  openFormDialog: PropTypes.func.isRequired,
}

export default ServiceCard;