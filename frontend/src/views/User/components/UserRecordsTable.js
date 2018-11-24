import React from 'react';
// mateiral ui core
import {withStyles} from '@material-ui/core/styles';
// material ui core components
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import SettingsIcon from '@material-ui/icons/Settings';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// material ui icons
import WarningIcon from '@material-ui/icons/Warning';
import DoneIcon from '@material-ui/icons/Done';
// jss style
import { userRecordsTableStyle } from '../../../assets/jss/userProfile';

function UserRecordsTable(props){
  const { classes, records, openRecordDialog } = props;
  
  return(
    <Paper>
      <Table className={classes.tableCell}>
        <TableHead>
        <TableRow>
          <TableCell>Usluga</TableCell>
          <TableCell>Opcija</TableCell>
          <TableCell>Započelo</TableCell>
          <TableCell>Ističe</TableCell>
          <TableCell padding="dense">Broj dolazaka</TableCell>
          <TableCell padding="dense">Cijena</TableCell>
          <TableCell padding="dense">Plaćeno</TableCell>
          <TableCell padding="checkbox">Izmijeni</TableCell>
        </TableRow>
        </TableHead>
        {(records)?
          <TableBody>
          {records.map((record, index) => {
            return (
              <TableRow key={record.id}>
                <TableCell>{record.service}</TableCell>
                <TableCell>{record.category}</TableCell>
                <TableCell>{record.started}</TableCell>
                <TableCell padding="dense">{record.ends}</TableCell>
                <TableCell padding="dense" numeric>{(record.active)?record.arrivals_left:<WarningIcon/>}</TableCell>
                <TableCell padding="dense" numeric>{record.nett_price + " kn"}</TableCell>
                <TableCell>{(!record.paid)?<WarningIcon/>:<DoneIcon/>}</TableCell>
                <TableCell padding="checkbox">
                  <IconButton name="record" id={index} onClick={openRecordDialog}>
                    <SettingsIcon/>
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>:undefined}
      </Table>
    </Paper>
  ) 
};

export default withStyles(userRecordsTableStyle)(UserRecordsTable);
