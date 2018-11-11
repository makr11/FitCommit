import React from 'react';
// material ui core components
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// material ui icons
import AppsIcon from '@material-ui/icons/Apps';
import Button from '@material-ui/core/Button';

class OptionsTable extends React.Component {

  render(){
    const { options } = this.props
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
                <Button
                  name="optionUpdate"
                  id={option.id}
                  
                  >
                    <AppsIcon />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
        </TableBody>
      </Table>
    )
  }
};

export default OptionsTable;
