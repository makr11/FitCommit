import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import { submitFormRecord } from '../../../redux/actions';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  });

const mapStateToProps = state => {
    return {
        services: state.servicesReducer.services,
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        submitRecord : (lead) => dispatch(submitFormRecord(lead)),
    }
}

class AddRecord extends React.Component {
    state = {
        service: {},
        categories: [],
        category: [],
        options:[],
        option: [],
      };
    
    handleChange = e => {
        switch(e.target.name){
            case ('service'):
                for(let i=0; i<this.props.services.length; i++){
                    if(this.props.services[i].service===e.target.value){
                        this.setState({ 
                            service: this.props.services[i],
                            categories: this.props.services[i].categories});      
                    }
                } 
                break
            case ('category'):
                for(let i=0; i<this.state.categories.length; i++){
                    if(this.state.categories[i].category===e.target.value){
                        this.setState({ 
                            category: this.state.categories[i],
                            options: this.state.categories[i].options
                        });
                    }
                } 
                break
            case ('option'):
                for(let i=0; i<this.state.options.length; i++){
                    if(this.state.options[i].id===parseInt(e.target.value, 10)){
                        this.setState({ 
                            option: this.state.options[i],
                        });
                    }
                } 
                break
            default:
                break    
        }
    };

    submitRecordToUser = (e) => {
        e.preventDefault();
        const user = this.props.user;
        const service = this.state.service.id;
        const category = this.state.category.id;
        const option = this.state.option.id;
        const lead = {user, service, category, option};
        this.props.submitRecord(lead);
    }

    render() {
        const {classes, services } = this.props;
        const { service, categories, category, options, option } = this.state;
        return(
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <FormLabel>Usluga</FormLabel>
                            <RadioGroup
                            name="service"
                            aria-label="service"
                            value={service.service}
                            onChange={this.handleChange}
                            >
                            {services.map(service => {
                                return(
                                    <FormControlLabel 
                                    key={service.id} 
                                    value={service.service} 
                                    control={<Radio />} 
                                    label={service.service} />
                                )
                            })}
                            </RadioGroup>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                        <FormLabel>Kategorija</FormLabel>
                            <RadioGroup
                            name="category"
                            aria-label="category"
                            value={category.category}
                            onChange={this.handleChange}
                            >
                            {categories.map(category => {
                                return(
                                    <FormControlLabel 
                                    key={category.id} 
                                    value={category.category} 
                                    control={<Radio />} 
                                    label={category.category} />
                                )
                            })}
                            </RadioGroup>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                        <FormLabel>Cijena</FormLabel>
                        <RadioGroup
                            name="option"
                            aria-label="option"
                            value={(option.id)?option.id.toString():""}
                            onChange={this.handleChange}
                            >
                            {options.map(option => {
                                return(
                                    <FormControlLabel 
                                    key={option.id} 
                                    value={option.id.toString()} 
                                    control={<Radio />} 
                                    label={option.price + " kn (" + option.quantity + " dolazaka/" + option.duration + " dana)"} />
                                )
                            })}
                            </RadioGroup>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            variant="outlined" 
                            color="primary" 
                            className={classes.button}
                            type="button"
                            onClick={this.submitRecordToUser}
                        >
                        Upiši uslugu
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddRecord));