import React from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AppsIcon from '@material-ui/icons/Apps';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

class OptionsTable extends React.Component {

  render(){
    const { options, removeInstance, setStateForm, serviceIndex, categoryIndex } = this.props
    return(
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Broj dolazaka</TableCell>
            <TableCell numeric>Cijena</TableCell>
            <TableCell numeric>Trajanje</TableCell>
            <TableCell >Obriši</TableCell>
            <TableCell >Izmijeni</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {options.map((option, optionIndex) => {
          return (
            <TableRow key={option.id}>
              <TableCell numeric>{option.arrivals}</TableCell>
              <TableCell numeric>{option.price}</TableCell>
              <TableCell numeric>{option.duration}</TableCell>
              <TableCell numeric>
                <Button name="option" id={option.id} onClick={removeInstance}>
                  <DeleteIcon />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  name="optionUpdate"
                  id={option.id}
                  onClick={setStateForm.bind(this, serviceIndex, categoryIndex, optionIndex)}>
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
