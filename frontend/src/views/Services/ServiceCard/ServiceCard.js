import React from 'react';
// prop types check
import PropTypes from 'prop-types';
// material ui core components
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
// app components
import OptionsTable from '../OptionsTable/OptionsTable';
import Editor from '../../../components/Editor';

function ServiceCard(props){
  const { service, sIndex, openFormDialog, openUpdateFormDialog, removeServices } = props;

  return (
    <Card >
      <Editor 
        name="service" 
        id={service.id} 
        open={openFormDialog} 
        update={openUpdateFormDialog.bind(this, sIndex, null, null)}
        del={removeServices}
      >
        <CardHeader
          title={service.service}
        />
      </Editor>
      {service.categories.map((category, cIndex) => {
        return(
          <div key={category.id}>
            <CardContent>
              <Editor 
                name="category" 
                id={category.id} 
                open={openFormDialog} 
                update={openUpdateFormDialog.bind(this, sIndex, cIndex, null)}
                del={removeServices}
              >
                <Typography variant="title">
                  {category.category}
                </Typography>
              </Editor>  
            </CardContent>
            <OptionsTable 
              options={category.options} 
              openFormDialog={openFormDialog}
              openUpdateFormDialog={openUpdateFormDialog}
              sIndex={sIndex}
              cIndex={cIndex}
              del={removeServices}
            />
          </div>
        )
      })}
    </Card>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.object.isRequired,
  sIndex: PropTypes.number.isRequired,
  openFormDialog: PropTypes.func.isRequired,
  openUpdateFormDialog: PropTypes.func.isRequired,
}

export default ServiceCard;