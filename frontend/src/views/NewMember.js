import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

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
});

function NewMember(props) {
  const { classes } = props;

  return (
    <Card>
      <CardHeader
        title="Upis novog člana"
      />
      <CardContent>
      <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="name"
            label="Ime"
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="surname"
            label="Prezime"
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="birthdate"
            label="Datum rođenja"
            type="date"
            defaultValue="11.09.1991"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <TextField
            id="joindate"
            label="Datum učlanjenja"
            type="date"
            defaultValue="11.09.1991"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </form>
      </CardContent>   
    </Card>  
  )
};

export default withStyles(styles)(NewMember);