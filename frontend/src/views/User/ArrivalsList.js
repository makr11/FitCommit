import React from 'react';
// material ui comoponents
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function ArrivalsList(props){
	const {
		open,
		close,
		arrivals
	} = props
	console.log("ArrivalsList")
	return(
		<Dialog
		open={open}
		>
			<DialogContent>
				<Paper>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Usluga</TableCell>
								<TableCell>Datum</TableCell>
								<TableCell>Vrijeme</TableCell>
							</TableRow>	
						</TableHead>
						{(arrivals)?
						<TableBody>
						{arrivals.map((arrival) => {
							return(
							<TableRow key={arrival.id}>
								<TableCell>{arrival.service + ' (' + arrival.category + ')'}</TableCell>
								<TableCell>{new Date(arrival.arrival).toLocaleDateString()}</TableCell>
								<TableCell>{arrival.arrival_time}</TableCell>
							</TableRow>
							)
						})}
						</TableBody>:undefined}
					</Table>
				</Paper>
			</DialogContent>
			<DialogActions>
        <Button onClick={close} color="primary">
          Zatvori
        </Button>
      </DialogActions>
		</Dialog>		
	)
}

export default ArrivalsList;