import React from 'react';
// prop types check
import PropTypes from 'prop-types';
// material ui core
import { withStyles } from "@material-ui/core";
// styles
import { serviceCard } from "./servicesStyle";
// material ui core components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// app components
import OptionsTable from './OptionsTable';
import Editor from '../../components/Editor';

function ServiceCard(props){
  const { classes, 
          service, 
          sIndex, 
          openNewServicesForm, 
          openEditServicesForm, 
          removeServices } = props;

  return (
    <Grid item xs={9}> 
      <Paper className={classes.card}>
        <Editor 
          name="service" 
          id={service.id} 
          open={openNewServicesForm} 
          update={openEditServicesForm.bind(this, sIndex, null, null)}
          del={removeServices}
        >

          <Typography variant="h5" style={{display: "inline-block"}}>
            {service.service}
          </Typography>
        </Editor>
       
        {service.categories.map((category, cIndex) => {
          return(
            <div key={category.id}>
              <Editor 
                name="category" 
                id={category.id} 
                open={openNewServicesForm} 
                update={openEditServicesForm.bind(this, sIndex, cIndex, null)}
                del={removeServices}
              >
                <Typography variant="h6" style={{display: "inline-block"}}> 
                  {category.category}
                </Typography>
              </Editor>  
              <OptionsTable 
                options={category.options} 
                openEditServicesForm={openEditServicesForm}
                sIndex={sIndex}
                cIndex={cIndex}
                del={removeServices}
              />
            </div>  
          )
        })}
      </Paper>
    </Grid>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.object.isRequired,
  sIndex: PropTypes.number.isRequired,
  openNewServicesForm: PropTypes.func.isRequired,
  openEditServicesForm: PropTypes.func.isRequired,
}

export default withStyles(serviceCard)(ServiceCard);