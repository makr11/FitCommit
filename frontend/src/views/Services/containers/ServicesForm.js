import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { onFormChangeFieldsNewService, onSubmitFormNewService } from '../../../redux/actions';

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
});

const mapStateToProps = (state) => {
    return {
      services: state.requestServicesRegistry.services,
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
            dispatch(onFormChangeFieldsNewService(obj));
        },
        handleSubmit: (lead) => {
            dispatch(onSubmitFormNewService(lead));
        },
    }    
}


class ServicesForm extends React.Component {

    submitData(e) {
        e.preventDefault();
        const { serviceID, service, categoryID, category, quantity, price, duration } = this.props
        const lead = { serviceID, service, categoryID, category, quantity, price, duration }
        
        this.props.handleSubmit(lead)
    };

    render(){

        const { classes, handleChange, serviceName, categoryName } = this.props
        
        return(
            <form className={classes.container} onSubmit={(e) => this.submitData(e)} noValidate autoComplete="off">
                <TextField
                id="service"
                label="Usluga"
                className={classes.textField}
                margin="normal"
                onChange={handleChange}
                value={serviceName}
                />
                <TextField
                id="category"
                label="Opcija"
                className={classes.textField}
                margin="normal"
                onChange={handleChange}
                value={categoryName}
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
            </form>
        )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ServicesForm));