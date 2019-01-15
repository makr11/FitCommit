import React from 'react';
// prop types check
import PropTypes from "prop-types";
// material ui core
import { withStyles } from "@material-ui/core";
// styles
import { optionsTable } from "./servicesStyle";
// material ui core components
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// material ui icons
import MoreVertIcon from '@material-ui/icons/MoreVert';

const OptionMenu = (props) => {
  const { 
    anchorEl, 
    id, 
    closeMenu, 
    update, 
    del, 
    sIndex, 
    cIndex, 
    oIndex 
  } = props;
  
  return(
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={closeMenu}
      onClick={closeMenu}
    >
      {/* Menu item sends name=undefined beacuse name isn't accessible*/}
      <MenuItem onClick={update.bind(this, sIndex, cIndex, oIndex)} id={id} name="option">
        Uredi
      </MenuItem>
      <MenuItem onClick={del} id={id} name="option">
        Obriši
      </MenuItem>
    </Menu>
  )
}

class OptionsTable extends React.Component {

  state = {
    anchorEl: null,
    oIndex: undefined,
    id: null
  };

  handleClick = e => {
    
    this.setState({ 
      anchorEl: e.currentTarget, 
      oIndex: parseInt(e.currentTarget.name, 10),
      id: e.currentTarget.id,
    });
  };

  closeMenu = () => {
    this.setState({ 
      anchorEl: null,
      oIndex: undefined, 
      id: null
    });
  };

  render(){
    const { 
      classes, 
      options, 
      sIndex, 
      cIndex, 
      openEditServicesForm 
    } = this.props;
    const { 
      anchorEl, 
      oIndex, 
      id 
    } = this.state;
    
    return(
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Cijena</TableCell>
            <TableCell>Broj dolazaka</TableCell>
            <TableCell>Trajanje</TableCell>
            <TableCell >Uredi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {options.map((option, oIndex) => {
          
          return (
            <TableRow key={option.id}>  
              <TableCell>{option.price}</TableCell>            
              <TableCell>{option.arrivals}</TableCell>
              <TableCell>{option.duration}</TableCell>
              <TableCell>
                <IconButton
                  name={oIndex}
                  id={option.id}
                  onClick={this.handleClick}
                  >
                    <MoreVertIcon />
                </IconButton>
                
              </TableCell>             
            </TableRow>
          );
        })}
        </TableBody>
        {(oIndex!==undefined)?
        <OptionMenu 
          anchorEl={anchorEl} 
          id={id}
          closeMenu={this.closeMenu}
          update={openEditServicesForm}
          sIndex={sIndex}
          cIndex={cIndex}
          oIndex={oIndex}
        />:undefined
        }
      </Table>
    )
  }
};

OptionsTable.propTypes={
  options: PropTypes.array.isRequired,
  sIndex: PropTypes.number.isRequired,
  cIndex: PropTypes.number.isRequired,
  openEditServicesForm: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired
}

export default withStyles(optionsTable)(OptionsTable);
