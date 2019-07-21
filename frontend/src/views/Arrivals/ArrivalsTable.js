import React from "react";
// material ui core
import { withStyles } from "@material-ui/core";
// styles
import { tableStyle } from "./arrivalsStyle";
// material ui core components
import Paper from "@material-ui/core/Paper";
// material ui icons
import WarningIcon from "@material-ui/icons/Warning";
import DoneIcon from "@material-ui/icons/Done";
// app components
import Table from "../../components/Table";

function ArrivalsTable(props) {
  const { classes, arrivals, isFetchingArrivals, handleDelete } = props;

  let data = [];
  console.log(isFetchingArrivals);
  if (arrivals) {
    arrivals.forEach((arrival, index, array) => {
      data.push([
        { identifier: arrival.id },
        {
          data: array.length - index,
          padding: "checkbox",
          align: "center"
        },
        {
          data: arrival.user,
          padding: "default",
          align: "left"
        },
        {
          data: arrival.service + " (" + arrival.category + ")",
          padding: "default",
          align: "left"
        },
        {
          data: new Date(arrival.arrival).toLocaleTimeString(),
          padding: "default",
          align: "center"
        },
        {
          data: !arrival.paid ? <WarningIcon /> : <DoneIcon />,
          padding: "checkbox",
          align: "center"
        }
      ]);
    });
  }

  return (
    <Paper className={classes.tableWrapper}>
      <Table
        tableHead={[
          {
            title: "Br.",
            padding: "checkbox",
            align: "center"
          },
          {
            title: "Korisnik",
            padding: "default",
            align: "left"
          },
          {
            title: "Usluga",
            padding: "default",
            align: "left"
          },
          {
            title: "Dolazak",
            padding: "default",
            align: "center"
          },
          {
            title: "Plaćeno",
            padding: "checkbox",
            align: "center"
          }
        ]}
        tableData={data}
        remove={handleDelete}
      />
    </Paper>
  );
}

export default withStyles(tableStyle)(ArrivalsTable);
