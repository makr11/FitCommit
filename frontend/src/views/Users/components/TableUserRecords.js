import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class TableUserRecords extends React.Component{

    render(){
        const {record, index, handlePaidCheck, removeInstance} = this.props
        return(
            <TableRow >
                <TableCell>{record.service}</TableCell>
                <TableCell>{record.category}</TableCell>
                <TableCell numeric>{record.arrivals_left}</TableCell>
                <TableCell>{record.nett_price + " kn"}</TableCell>
                <TableCell>{record.started}</TableCell>
                <TableCell>{record.ends}</TableCell>
                <TableCell>
                    <FormControlLabel
                        control={
                            <Checkbox
                            id={String(record.id)}
                            checked={record.paid}
                            onChange={handlePaidCheck.bind(this, index, record.paid)}
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
        )
    }
}

export default TableUserRecords;