import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { onFormChangeFields, onSubmitFormNewService, onUpdateFormOption } from '../../../redux/actions';

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
      services: state.requestServicesReducer.services,
      service: state.formAction.service,
      category: state.formAction.category,
      quantity: state.formAction.quantity,
      price: state.formAction.price,
      duration: state.formAction.duration,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleChange: (e) => {
            const obj = {[e.target.id]: e.target.value};
            dispatch(onFormChangeFields(obj));
        },
        handleSubmit: (lead) => dispatch(onSubmitFormNewService(lead)),
        handleUpdate: (lead) => dispatch(onUpdateFormOption(lead))
    }    
}

class ServicesForm extends React.Component {

    openFormMethod = (e) => {
        this.props.openFormMethod(e)
    }
    
    submitData(e) {
        e.preventDefault();
        const { serviceID, 
                service, 
                categoryID,  
                category, 
                optionID, 
                quantity, 
                price, 
                duration } = this.props;
        const lead = { serviceID, 
                       service, 
                       categoryID, 
                       category, 
                       optionID, 
                       quantity,     
                       price, 
                       duration };
        
        (optionID) ? this.props.handleUpdate(lead) : this.props.handleSubmit(lead);
    };

    render(){

        const { classes, 
                handleChange, 
                serviceHidden,
                serviceID, 
                serviceIDCheck, 
                categoryHidden, 
                categoryID,
                categoryIDCheck,
                optionID,
                openForm,
                title,
              } = this.props;
        const hiddenField = [classes.textField, classes.hideField];
    
        return(
            
            (!openForm) ? <span></span> : (serviceID===serviceIDCheck || categoryID===categoryIDCheck) ?
            <div>
                {console.log(this.props)}
                <Typography variant="subheading">
                    {(title) ? title : (optionID) ? "Izmijeni" : "Nova cijena"}
                </Typography>
                <form className={classes.container} onSubmit={(e) => this.submitData(e)} noValidate autoComplete="off">
                
                    <TextField
                    id="service"
                    label="Usluga"
                    className={(serviceHidden) ? hiddenField.join(" ") : classes.textField}
                    margin="normal"
                    onChange={handleChange}
                    />
                    <TextField
                    id="category"
                    label="Opcija"
                    className={(categoryHidden) ? hiddenField.join(" ") : classes.textField}
                    margin="normal"
                    onChange={handleChange}
                    />
                    <TextField
                    id="quantity"
                    label="Broj dolazaka"
                    className={classes.textField}
                    type="number"
                    margin="normal"
                    onChange={handleChange}
                    />
                    <TextField
                    id="price"
                    label="Cijena"
                    className={classes.textField}
                    type="number"
                    margin="normal"
                    onChange={handleChange}
                    />
                    <TextField
                    id="duration"
                    label="Trajanje"
                    className={classes.textField}
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
                    onClick={this.openFormMethod}
                    >
                        Zatvori
                    </Button>
                </form>
            </div> : <span></span>   
        )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ServicesForm));