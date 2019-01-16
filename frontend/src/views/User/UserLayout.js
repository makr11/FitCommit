import React from 'react';
// material ui core
import { withStyles } from '@material-ui/core';
// styles
import { user } from './userStyle';
// material ui components
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// app components
import Profile from './Profile';
import RecordsTable from './RecordsTable';   

function UserLayout(props){
	const {
		classes,
		user,
		records,
		removeRecord,
		openRecordForm,
		openArrivalsList
	} = props
	console.log("UserLayout")
	return(
		<Grid container spacing={24}>
			<Profile
				user={user}
				records={records.length}
			/>
			<RecordsTable
				records={records}
				removeRecord={removeRecord}
				openRecordForm={openRecordForm}
				openArrivalsList={openArrivalsList}
			/>
			<Tooltip title="Nova usluga">
				<Fab color="primary" className={classes.addIcon} onClick={openRecordForm}>
					<AddIcon />
				</Fab>
			</Tooltip>
		</Grid>
	)
}

export default withStyles(user)(UserLayout);