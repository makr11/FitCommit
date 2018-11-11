import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core'; 
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

const styles = () => ({
  root: {
    position: 'relative',
    display: 'inline-block',
    alignItems: 'center',
  },
  element: {
    display: "inline-block",
    height: '64px'
  }
})

class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state={
      hidden: true,
    }
  }

  hover = () => {
    this.setState({
      hidden: !this.state.hidden,
    })
  }

  render(){
    const { children, classes, open, del, type, id } = this.props;
    const { hidden } = this.state;
    return(
      <div onMouseEnter={this.hover} onMouseLeave={this.hover}>
        <div className={classes.element}>
          {children}
        </div>
        {!hidden?    
        <Toolbar className={classes.root}>
          <IconButton name={type} id={id} onClick={open}>
            <CreateIcon/>
          </IconButton>
          <IconButton name={type} id={id} onClick={del}>
            <DeleteIcon/>
          </IconButton>
        </Toolbar>
        :undefined}
      </div>
    )
  }
}; 

Editor.propTypes = {
  children: PropTypes.element.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Editor);