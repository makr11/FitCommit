import React from 'react';
// material ui comoponents
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Table from '../../components/Table';

function ArrivalsList(props){
	const {
		open,
		close,
		record,
		arrivals
	} = props
	
	const data = []
	arrivals.forEach((arrival, index, array) => {
		data.push([
			array.length-index,
			arrival.service + ' (' + arrival.category + ')',
			new Date(arrival.arrival).toLocaleDateString(),
			new Date(arrival.arrival).toLocaleTimeString()
		]);
	});

	return(
		(arrivals)?
		<Dialog
			open={open}
		>
			<DialogContent>
				<Chip label={"Preostalo dolazaka: " + record.arrivals_left}/>
				<Chip label={"Preostalo dana: " + record.days_left}/>
				<Table
					tableHead={[
						"Br.",
						"Usluga",
						"Datum",
						"Vrijeme"
					]}
					tableData={data}
				/>
			</DialogContent>
			<DialogActions>
        <Button onClick={close} color="primary">
          Zatvori
        </Button>
      </DialogActions>
		</Dialog>:undefined	
	)
};

export default ArrivalsList;