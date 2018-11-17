import React from 'react';
// prop types check
import PropTypes from "prop-types";
// material ui core components
import Button from '@material-ui/core/Button';
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
  const { anchorEl, id, closeMenu, update, del, sIndex, cIndex, oIndex } = props;
  
  return(
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={closeMenu}
      onClick={closeMenu}
    >
      <MenuItem >
        <Button onClick={update.bind(this, sIndex, cIndex, oIndex)} id={id} name="option">
          Uredi
        </Button>
      </MenuItem>
      <MenuItem >
        <Button onClick={del} id={id} name="option">
          Obriši
        </Button>
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
    const { options, sIndex, cIndex, openUpdateFormDialog } = this.props;
    const { anchorEl, oIndex, id } = this.state;
    
    return(
      <Table >
        <TableHead>
          <TableRow>
            <TableCell numeric>Cijena</TableCell>
            <TableCell numeric>Broj dolazaka</TableCell>
            <TableCell numeric>Trajanje</TableCell>
            <TableCell >Uredi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {options.map((option, oIndex) => {
          
          return (
            <TableRow key={option.id}>  
              <TableCell numeric>{option.price}</TableCell>            
              <TableCell numeric>{option.arrivals}</TableCell>
              <TableCell numeric>{option.duration}</TableCell>
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
          update={openUpdateFormDialog}
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
  openUpdateFormDialog: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired
}

export default OptionsTable;
