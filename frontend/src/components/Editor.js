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
    display: 'flex',
    alignItems: "center",
    height: "60px"
  },
  editor: {
    display: "inline-block"
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
    const { children, 
            classes, 
            open, 
            del, 
            name, 
            id, 
            update } = this.props;
    const { hidden } = this.state;
    
    return(
      <div className={classes.root} onMouseEnter={this.hoverIn} onMouseLeave={this.hoverOut}>
        {children}
        {!hidden?    
        <Toolbar className={classes.element}>
          <IconButton name={name} id={id} onClick={open}>
            <AddIcon style={{ fontSize: 20 }}/>
          </IconButton>
          <IconButton name={name} id={id} onClick={update}>
            <CreateIcon style={{ fontSize: 20 }}/>
          </IconButton>
          <IconButton name={name} id={id} onClick={del}>
            <DeleteIcon style={{ fontSize: 20 }}/>
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