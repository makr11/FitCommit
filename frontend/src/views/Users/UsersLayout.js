import React from 'react';
// material ui core
import { withStyles } from '@material-ui/core/styles';
// styles
import { users } from './usersStyle';
// material ui core components
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
// material ui icons
import AddIcon from '@material-ui/icons/Add';
// app components
import UsersTable from './UsersTable';

function UsersLayout(props){
	const {
		classes,
		users,
		selectUser,
		removeUser,
		openUserForm
	} = props;
	return(
		<React.Fragment>
			<UsersTable
				users={users}
				selectUser={selectUser}
				removeUser={removeUser}
			/>
			<Tooltip title="Novi član">
				<Fab color="primary" className={classes.addIcon} onClick={openUserForm}>
					<AddIcon />
				</Fab>
			</Tooltip>
		</React.Fragment>
	)
}

export default withStyles(users)(UsersLayout);