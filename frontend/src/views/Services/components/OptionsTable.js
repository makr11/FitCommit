import React from 'react';
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
  const { anchorEl, id, closeMenu, openForm } = props;
  return(
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={closeMenu}
    >
      <MenuItem>
        <Button onClick={openForm} id={id} name="option">
          Uredi
        </Button>
      </MenuItem>
      <MenuItem >
        <Button id={id} name="option">
          Obriši
        </Button>
      </MenuItem>
    </Menu>
  )
}

class OptionsTable extends React.Component {

  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ anchorEl: null });
  };

  openForm = (e) => {
    this.setState({ anchorEl: null });
    this.props.openUpdateFormDialog(e);
  };

  render(){
    const { options } = this.props;
    const { anchorEl } = this.state;
    return(
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Broj dolazaka</TableCell>
            <TableCell numeric>Cijena</TableCell>
            <TableCell numeric>Trajanje</TableCell>
            <TableCell >Uredi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {options.map((option) => {
          return (
            <TableRow key={option.id}>              
              <TableCell numeric>{option.arrivals}</TableCell>
              <TableCell numeric>{option.price}</TableCell>
              <TableCell numeric>{option.duration}</TableCell>
              <TableCell>
                <IconButton
                  onClick={this.handleClick}
                  >
                    <MoreVertIcon />
                </IconButton>
                
              </TableCell>  
              <OptionMenu 
                anchorEl={anchorEl} 
                closeMenu={this.closeMenu}
                openForm={this.openForm}
                id={option.id}
              />           
            </TableRow>
          );
        })}
        </TableBody>
      </Table>
    )
  }
};

export default OptionsTable;
