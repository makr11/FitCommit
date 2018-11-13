import React from 'react';
// prop types check
import PropTypes from 'prop-types';
// material ui core
import { withStyles } from '@material-ui/core'; 
// material ui core components
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
// material ui icons
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import AddIcon from '@material-ui/icons/Add';

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

class Editor extends React.PureComponent{
  constructor(props){
    super(props);
    this.state={
      hidden: true,
    }
  }

  hoverIn = () => {
    this.setState({
      hidden: false,
    })
  }

  hoverOut = () => {
    this.setState({
      hidden: true,
    })
  }

  render(){
    const { children, classes, open, del, name, id, update } = this.props;
    const { hidden } = this.state;
    return(
      <div onMouseEnter={this.hoverIn} onMouseLeave={this.hoverOut}>
        <div className={classes.element}>
          {children}
        </div>
        {!hidden?    
        <Toolbar className={classes.root}>
          <IconButton name={name} id={id} onClick={open}>
            <AddIcon/>
          </IconButton>
          <IconButton name={name} id={id} onClick={update}>
            <CreateIcon/>
          </IconButton>
          <IconButton name={name} id={id} onClick={del}>
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
  open: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default withStyles(styles)(Editor);