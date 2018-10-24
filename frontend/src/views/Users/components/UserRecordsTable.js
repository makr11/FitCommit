import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import WarningIcon from '@material-ui/icons/Warning';

class UserRecordsTable extends React.Component {

  handlePaidCheck(index, paid, e){
    const id = e.currentTarget.id;
    this.props.paidCheck(parseInt(id, 10), parseInt(index, 10), (paid) ? {paid: 0} : {paid: 1});
  }

  render(){
    const { records, removeInstance } = this.props;

    return(
      <Paper>
        <Table>
          <TableHead>
          <TableRow>
            <TableCell>Usluga</TableCell>
            <TableCell >Opcija</TableCell>
            <TableCell numeric>Broj dolazaka</TableCell>
            <TableCell numeric>Cijena</TableCell>
            <TableCell>Započelo</TableCell>
            <TableCell>Ističe</TableCell>
            <TableCell>Plaćeno</TableCell>
            <TableCell>Obriši</TableCell>
          </TableRow>
          </TableHead>
          {(records)?
            <TableBody>
            {records.map((record, index) => {
              return (
                <TableRow key={record.id}>
                  <TableCell>{record.service}</TableCell>
                  <TableCell>{record.category}</TableCell>
                  <TableCell numeric>{(record.active)?record.arrivals_left:<WarningIcon/>}</TableCell>
                  <TableCell>{record.nett_price + " kn"}</TableCell>
                  <TableCell>{record.started}</TableCell>
                  <TableCell>{record.ends}</TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                        id={String(record.id)}
                        checked={record.paid}
                        onChange={this.handlePaidCheck.bind(this, index, record.paid)}
                        value={String(index)}
                        />
                      }
                      label={(record.paid)?'Plaćeno':'Nije plaćeno'}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton name="record" id={record.id} onClick={removeInstance}>
                      <DeleteIcon/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>:undefined}
        </Table>
      </Paper>
    )
  }
}

export default UserRecordsTable;
