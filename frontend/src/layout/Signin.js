import React from "react";
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { authenticate } from "../store/actions/authenticationA";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
});

class Signin extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.currentTarget.value
    });
  };

  submit = () => {
    const lead = { ...this.state };
    this.props.authenticate(lead);
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper>
        <TextField
          id="username"
          label="Korisničko ime"
          className={classes.textField}
          value={this.state.username}
          onChange={this.handleChange}
          margin="normal"
        />
        <TextField
          id="password"
          label="Lozinka"
          className={classes.textField}
          value={this.state.password}
          onChange={this.handleChange}
          margin="normal"
        />
        <Button onClick={this.submit}>Pošalji</Button>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    tokens: state.authenticationReducer.tokens
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticate: lead => dispatch(authenticate(lead))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Signin));
