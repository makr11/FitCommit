import React from "react";
// material ui core
import { withStyles } from "@material-ui/core";
// styles
import { user } from "./userStyle";
// material ui components
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// app components
import Profile from "./Profile";
import RecordsTable from "./RecordsTable";

function UserLayout(props) {
  const {
    classes,
    user,
    records,
    removeRecord,
    openUserForm,
    openRecordForm,
    openArrivalsList,
    openMenu,
    closeMenu,
    anchor,
    id
  } = props;

  const OptionMenu = (
    <Menu
      anchorEl={anchor}
      open={Boolean(anchor)}
      onClose={closeMenu}
      onClick={closeMenu}
    >
      <MenuItem onClick={openUserForm} id={id}>
        Uredi podatke člana
      </MenuItem>
      <MenuItem onClick={openRecordForm} id={id}>
        Upiši novu uslugu
      </MenuItem>
    </Menu>
  );

  return (
    <Grid container spacing={4}>
      <Profile user={user} records={records.length} />
      <RecordsTable
        records={records}
        removeRecord={removeRecord}
        openRecordForm={openRecordForm}
        openArrivalsList={openArrivalsList}
      />
      <Fab color="primary" className={classes.addIcon} onClick={openMenu}>
        <AddIcon />
      </Fab>
      {OptionMenu}
    </Grid>
  );
}

export default withStyles(user)(UserLayout);
