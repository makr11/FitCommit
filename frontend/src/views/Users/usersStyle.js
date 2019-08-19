import { createStyles } from "@material-ui/core/styles";

export const users = {
  addIcon: {
    position: "fixed",
    bottom: 20,
    right: 10
  }
};

export const addUserForm = theme => ({
  textField: {
    marginLeft: "1.5%",
    marginRight: "1.5%",
    width: "47%",
    minWidth: 200
  },
  emailField: {
    marginLeft: "1.5%",
    marginRight: "1.5%",
    width: "97%",
    minWidth: 200
  }
});

export const usersTable = createStyles({
  tableWrapper: {
    overflowX: "auto",
    margin: "1.5%"
  },
  table: {
    minWidth: "600px"
  }
});

export const serviceForm = {
  textField: {
    marginLeft: "1.5%",
    marginRight: "1.5%",
    minWidth: 200
  }
};
