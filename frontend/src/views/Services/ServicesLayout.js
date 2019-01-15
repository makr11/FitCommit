import React from 'react';
// material ui core
import { withStyles } from '@material-ui/core';
// styles
import { services } from './servicesStyle';
// app components
import ServicesList from './ServicesList';
// material ui components
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

function ServicesLayout(props){
	const {
		classes,
		services,
		openNewServicesForm,
		openEditServicesForm,
		removeServices
	} = props;

	return(
		<React.Fragment>
			<ServicesList 
				services={services}
				openNewServicesForm={openNewServicesForm}
				openEditServicesForm={openEditServicesForm}
				removeServices={removeServices}
			/>
			<Tooltip title="Nova usluga">
				<Fab
					name="new"
					color="primary"
					onClick={openNewServicesForm}
					className={classes.addIcon}
				>
					<AddIcon />
				</Fab>
			</Tooltip>
		</React.Fragment>
	)
}

export default withStyles(services)(ServicesLayout);