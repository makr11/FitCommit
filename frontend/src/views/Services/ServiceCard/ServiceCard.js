import React from 'react';
// prop types check
import PropTypes from 'prop-types';
// material ui core components
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// app components
import OptionsTable from '../OptionsTable/OptionsTable';
import Editor from '../../../components/Editor';

function ServiceCard(props){
  const { service, sIndex, openFormDialog, openUpdateFormDialog, removeServices } = props;

  return (
    <Grid item xs={9}> 
      <Card>
        <CardContent>
          <Editor 
            name="service" 
            id={service.id} 
            open={openFormDialog} 
            update={openUpdateFormDialog.bind(this, sIndex, null, null)}
            del={removeServices}
          >

            <Typography variant="h4" style={{display: "inline-block"}}>
              {service.service}
            </Typography>
          </Editor>
        </CardContent>        
        {service.categories.map((category, cIndex) => {
          return(
            <CardContent key={category.id}>
              <Editor 
                name="category" 
                id={category.id} 
                open={openFormDialog} 
                update={openUpdateFormDialog.bind(this, sIndex, cIndex, null)}
                del={removeServices}
              >
                <Typography variant="h6" style={{display: "inline-block"}}> 
                  {category.category}
                </Typography>
              </Editor>  
              <OptionsTable 
                options={category.options} 
                openFormDialog={openFormDialog}
                openUpdateFormDialog={openUpdateFormDialog}
                sIndex={sIndex}
                cIndex={cIndex}
                del={removeServices}
              />
            </CardContent>
          )
        })}
      </Card>
    </Grid>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.object.isRequired,
  sIndex: PropTypes.number.isRequired,
  openFormDialog: PropTypes.func.isRequired,
  openUpdateFormDialog: PropTypes.func.isRequired,
}

export default ServiceCard;