import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { onFormChangeFields, submitFormService, updateFormService } from '../../../redux/actions';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  hideField: {
    display: "none"
  }
});

const mapStateToProps = (state) => {
    return {
      services: state.servicesReducer.services,
      service: state.formInput.service,
      category: state.formInput.category,
      quantity: state.formInput.quantity,
      price: state.formInput.price,
      duration: state.formInput.duration,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleChange: (e) => {
            const obj = {[e.target.id]: e.target.value};
            dispatch(onFormChangeFields(obj));
        },
        handleSubmit: (lead) => dispatch(submitFormService(lead)),
        handleUpdate: (lead) => dispatch(updateFormService(lead))
    }    
}

class ServicesForm extends React.Component {
    
    submitForm = (e) => {
        e.preventDefault();
        const { serviceID, 
                service, 
                categoryID,  
                category, 
                optionID, 
                quantity, 
                price, 
                duration,
                update } = this.props;
        const lead = { serviceID, 
                       service, 
                       categoryID, 
                       category, 
                       optionID, 
                       quantity,     
                       price, 
                       duration };
        
        (update) ? this.props.handleUpdate(lead) : this.props.handleSubmit(lead);
    };

    render(){

        const { classes, 
                handleChange, 
                hideService,
                hideCategory,
                hideOption,
                close,
                title,
              } = this.props;
        const hiddenField = [classes.textField, classes.hideField];
        return(
            <div>
                <Typography variant="subheading">
                    {title}
                </Typography>
                <form className={classes.container} onSubmit={this.submitForm} noValidate autoComplete="off">
                
                    <TextField
                    id="service"
                    label="Usluga"
                    className={(hideService) ? hiddenField.join(" ") : classes.textField}
                    margin="normal"
                    onChange={handleChange}
                    />
                    <TextField
                    id="category"
                    label="Opcija"
                    className={(hideCategory) ? hiddenField.join(" ") : classes.textField}
                    margin="normal"
                    onChange={handleChange}
                    />
                    <TextField
                    id="quantity"
                    label="Broj dolazaka"
                    className={(hideOption) ? hiddenField.join(" ") : classes.textField}
                    type="number"
                    margin="normal"
                    onChange={handleChange}
                    />
                    <TextField
                    id="price"
                    label="Cijena"
                    className={(hideOption) ? hiddenField.join(" ") : classes.textField}
                    type="number"
                    margin="normal"
                    onChange={handleChange}
                    />
                    <TextField
                    id="duration"
                    label="Trajanje"
                    className={(hideOption) ? hiddenField.join(" ") : classes.textField}
                    type="number"
                    margin="normal"
                    onChange={handleChange}
                    />
                    <Button 
                    variant="outlined" 
                    color="primary" 
                    className={classes.button}
                    type="submit"
                    >
                        Spremi
                    </Button>
                    <Button
                    variant="outlined"
                    type="button"
                    name="close"
                    className={classes.button}
                    onClick={close}
                    >
                        Zatvori
                    </Button>
                </form>
            </div> 
        )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ServicesForm));