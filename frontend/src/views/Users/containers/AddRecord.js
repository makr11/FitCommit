import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { submitFormRecord } from '../../../redux/actions';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textField: {
    flexBasis: 200,
    margin: 10
  },
  form: {
    flexDirection: 'row',
  }
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
    price: '',
    discount: '',
    nettPrice: '',
    paid: false,
  };

  handleSelectService = e => {
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
              price: this.state.options[i].price,
              discount: 0,
              nettPrice: this.state.options[i].price,
            });
          }
        }
        break
      default:
        break
    }
  };

  handleServiceInput = (e) => {
    let value = (e.target.name==="paid") ? e.target.checked : e.target.value;
    this.setState(
      {[e.target.name]: value},
      () => {
        const discount = 1 - (this.state.discount / 100);
        this.setState({nettPrice: this.state.price * discount})
      }
    );
  }

  submitRecordToUser = (e) => {
    e.preventDefault();
    const user = this.props.user;
    const service = this.state.service.id;
    const category = this.state.category.id;
    const option = this.state.option.id;
    const price = this.state.price;
    const {discount, nettPrice, paid} = this.state;
    const lead = {user, service, category, option, price, discount, nettPrice, paid};
    this.props.submitRecord(lead);
  }

  render() {
    const { classes, services } = this.props;
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
                  onChange={this.handleSelectService}
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
                  onChange={this.handleSelectService}
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
                  onChange={this.handleSelectService}
                >
                {options.map(option => {
                  return(
                    <FormControlLabel
                      key={option.id}
                      value={option.id.toString()}
                      control={<Radio />}
                      label={option.price + " kn (" + option.arrivals + " dolazaka/" + option.duration + " dana)"}
                    />
                  )
                })}
                </RadioGroup>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.form}>
                <TextField
                  label="Cijena"
                  name="price"
                  className={classes.textField}
                  value={this.state.price}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment variant="filled" position="end">
                        Kn
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Popust"
                  name="discount"
                  className={classes.textField}
                  onChange={this.handleServiceInput}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment variant="filled" position="end">
                        %
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Cijena sa popustom"
                  id="discounted_price"
                  className={classes.textField}
                  value={this.state.nettPrice}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment variant="filled" position="end">
                        Kn
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                    name="paid"
                    checked={this.state.paid}
                    onChange={this.handleServiceInput}
                    />
                  }
                  label={(this.state.paid)?'Plaćeno':'Nije plaćeno'}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  type="button"
                  onClick={this.submitRecordToUser}
                >
                Upiši uslugu
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddRecord));
