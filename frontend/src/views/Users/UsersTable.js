import React from "react";
// react router
import { Link } from "react-router-dom";
// material ui core
import { withStyles } from "@material-ui/core";
// styles
import { usersTable } from "./usersStyle";
// material ui core components
import Paper from "@material-ui/core/Paper";
import Table from "../../components/Table";
import IconButton from "@material-ui/core/IconButton";
// material ui icons
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const ProfileLink = props => {
  const { id, selectUser } = props;
  return (
    <Link to={"/profile/" + id}>
      <IconButton id={id} onClick={selectUser}>
        <AccountCircleIcon />
      </IconButton>
    </Link>
  );
};

function UsersTable(props) {
  const { classes, users, selectUser, removeUser } = props;

  let filterable = {
    ID: "IDUser",
    Ime: "last_name",
    Prezime: "first_name",
    Dug: "debt"
  };

  let data = [];
  if (users) {
    users.forEach(user => {
      data.push([
        { identifier: user.id },
        {
          data: <ProfileLink id={user.id} selectUser={selectUser} />,
          padding: "checkbox",
          align: "center"
        },
        {
          data: user.IDUser,
          padding: "default",
          align: "left"
        },
        {
          data: user.first_name,
          padding: "default",
          align: "left"
        },
        {
          data: user.last_name,
          padding: "default",
          align: "left"
        },
        {
          data: user.debt,
          padding: "default",
          align: "right"
        }
      ]);
    });
  }

  return (
    <Paper className={classes.tableWrapper}>
      <Table
        tableHead={[
          {
            title: "Profil",
            padding: "checkbox",
            align: "center",
            size: "small"
          },
          {
            title: "ID",
            padding: "default",
            align: "left",
            size: "medium"
          },
          {
            title: "Ime",
            align: "left"
          },
          {
            title: "Prezime",
            align: "left"
          },
          {
            title: "Dug",
            padding: "default",
            align: "right"
          }
        ]}
        tableData={data}
        remove={removeUser}
        filterable={filterable}
      />
    </Paper>
  );
}

export default withStyles(usersTable)(UsersTable);
