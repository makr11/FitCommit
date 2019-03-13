import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
// @material-ui/core components
import Paper from '@material-ui/core/Paper';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

const style = () => ({
  root: {
    overflowX: "auto",
  },
  table: {
    tableLayout: "fixed",
  }
});

function CustomTable({ ...props }) {
  const { classes, tableHead, tableData } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead>
            <TableRow>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    key={key}
                    padding={prop.padding}
                    align={prop.align}
                  >
                    {prop.title}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key}>
                {prop.map((prop, key) => {
                  return (
                    <TableCell 
                    key={key} 
                    padding={prop.padding}
                    align={prop.align}
                    >
                      {prop.data}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(style)(CustomTable);