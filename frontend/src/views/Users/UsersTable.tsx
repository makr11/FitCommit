import React from "react";
// react router
import { Link } from "react-router-dom";
// material ui core
import { withStyles } from "@material-ui/core/styles";
// styles
import { usersTable } from "./usersStyle";
// material ui core components
import Paper from "@material-ui/core/Paper";
import Table from "../../components/Table";
import IconButton from "@material-ui/core/IconButton";
// material ui icons
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

interface ProfileLinkProps {
  id: number;
  selectUser(): object;
}

const ProfileLink: React.SFC<ProfileLinkProps> = props => {
  const { id, selectUser } = props;
  return (
    <Link to={"/profile/" + id}>
      <IconButton id={id.toString()} onClick={selectUser}>
        <AccountCircleIcon />
      </IconButton>
    </Link>
  );
};

interface UsersTableProps {
  classes: any;
  users: Array<any>;
  selectUser(): object;
  removeUser(): void;
}

interface User {
  id: number;
  IDUser: number;
  first_name: string;
  last_name: string;
  debt: number;
}

function UsersTable(props: UsersTableProps) {
  const { classes, users, selectUser, removeUser } = props;

  let filterable: object = {
    ID: "IDUser",
    Ime: "last_name",
    Prezime: "first_name",
    Dug: "debt"
  };

  let data: object[] = [];
  if (users) {
    users.forEach((user: User) => {
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
