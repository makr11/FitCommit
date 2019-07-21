import React from "react";
// material core
import { withStyles } from "@material-ui/core/styles";
// material ui core components
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  headingContainer: {
    backgroundColor: "#3f51b5",
    marginTop: theme.spacing(3)
  },
  heading: {
    marginLeft: theme.spacing(3),
    color: "#ffff"
  }
});

function ViewElementsHeading(props) {
  const { classes, title, style } = props;
  return (
    <Paper className={classes.headingContainer} style={style}>
      <Typography
        variant="subtitle1"
        align="left"
        color="inherit"
        className={classes.heading}
      >
        {title}
      </Typography>
    </Paper>
  );
}

export default withStyles(styles)(ViewElementsHeading);
