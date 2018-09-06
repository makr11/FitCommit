import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { requestMembers, onFormChangeFields } from '../../../redux/actions';

import { users } from '../../../redux/apiUrls';

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
    first_name: state.formAction.first_name,
    last_name: state.formAction.last_name,
    password: state.formAction.password,
    email: state.formAction.email,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (e) => {
      const obj = {[e.target.id]: e.target.value};
      dispatch(onFormChangeFields(obj));
    },
    onRequestMembers: () => dispatch(requestMembers()),
  }
}

class SignIn extends React.Component{

  handleSubmit = e => {
    e.preventDefault();
    const { first_name, last_name, password, email } = this.props;
    const username = first_name + '.' + last_name;
    const lead = { first_name, last_name, username, password, email }
    const conf = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
  
      body: JSON.stringify(lead),
    };
    fetch(users, conf).then(response => console.log(response))
    .then(() => {
      this.props.onRequestMembers();
    });
  };

  render(){
    const { classes, handleChange } = this.props;

    return (
      <Card>
        <CardHeader
          title="Upis novog člana"
        />
        <CardContent>
        <form className={classes.container} onSubmit={this.handleSubmit} noValidate autoComplete="off">
            <TextField
              id="first_name"
              label="Ime"
              className={classes.textField}
              margin="normal"
              onChange={handleChange}
            />
            <TextField
              id="last_name"
              label="Prezime"
              className={classes.textField}
              margin="normal"
              onChange={handleChange}
            />
            <TextField
              id="password"
              label="Lozinka"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
              onChange={handleChange}
            />
            <TextField
              id="email"
              label="E-mail"
              type="email"
              className={classes.textField}
              margin="normal"
              onChange={handleChange}
            />
            <Button 
              variant="outlined" 
              color="primary" 
              className={classes.button}
              type="submit"
            >
              Primary
            </Button>
          </form>
        </CardContent>   
      </Card>  
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));