import React from "react";
import { withStyles } from "@material-ui/core";
import classNames from "classnames";
// @material-ui/core components
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import TablePagination from "@material-ui/core/TablePagination";
// @material ui icons
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";

function desc(a, b, orderBy) {
  if (orderBy) {
    if (b[orderBy + 1]["data"] < a[orderBy + 1]["data"]) {
      return -1;
    }
    if (b[orderBy + 1]["data"] > a[orderBy + 1]["data"]) {
      return 1;
    }
    return 0;
  }
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const tableHeadStyles = () => ({
  smallCell: {
    width: "50px"
  },
  mediumCell: {
    width: "80px"
  }
});

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      tableHead,
      classes
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell
            padding="checkbox"
            align="center"
            className={classes.smallCell}
          >
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount && numSelected !== 0}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {tableHead.map((prop, key) => {
            let size;
            switch (prop.size) {
              case "small":
                size = classes.smallCell;
                break;
              case "medium":
                size = classes.mediumCell;
                break;
              default:
                break;
            }
            return (
              <TableCell
                key={key}
                align={prop.align}
                padding={prop.padding}
                sortDirection={orderBy === key ? order : false}
                className={size}
              >
                <TableSortLabel
                  active={orderBy === key}
                  direction={order}
                  onClick={this.createSortHandler(key)}
                >
                  {prop.title}
                </TableSortLabel>
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead = withStyles(tableHeadStyles)(EnhancedTableHead);

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    display: "flex",
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

let EnhancedTableToolbar = props => {
  const {
    numSelected,
    remove,
    selected,
    classes,
    name,
    label,
    filter,
    filterBy,
    handleInput,
    handleFilterSelect
  } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} izabrano
          </Typography>
        ) : (
          undefined
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={() => remove(selected)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <React.Fragment>
            <TextField
              name={name}
              label={label}
              value={filter}
              onChange={handleInput}
              margin="normal"
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">Age</InputLabel>
              <Select value={filterBy} onChange={handleFilterSelect}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </React.Fragment>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const style = () => ({
  root: {
    overflowX: "auto"
  },
  table: {
    tableLayout: "fixed"
  }
});

class CustomTable extends React.Component {
  state = {
    order: "desc",
    orderBy: 0,
    filter: "",
    filterBy: 0,
    selected: [],
    page: 0,
    rowsPerPage: 5
  };

  componentDidUpdate(prevProps) {
    if (prevProps.tableData.length !== this.props.tableData.length) {
      this.setState({
        ...this.state,
        selected: []
      });
    }
  }

  handleInput = e => {
    this.setState({
      filter: e.target.value
    });
  };

  handleFilterSelect = e => {
    this.setState({
      filterBy: e.target.name
    });
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.currentTarget.checked) {
      this.setState({
        ...this.state,
        selected: this.props.tableData.map(n => n[0].identifier)
      });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (e, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, tableHead, tableData, remove } = this.props;
    const {
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      filterBy
    } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, tableData.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          filterBy={filterBy}
          numSelected={selected.length}
          remove={remove}
          selected={selected}
          handleInput={this.handleInput}
          handleFilterSelect={this.handleFilterSelect}
        />
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={tableData.length}
              tableHead={tableHead}
            />
          ) : null}
          <TableBody>
            {stableSort(tableData, getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((props, key) => {
                const isSelected = this.isSelected(props[0]["identifier"]);
                return (
                  <TableRow
                    selected={isSelected}
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={key}
                  >
                    <TableCell
                      padding="checkbox"
                      align="center"
                      style={{ width: "40px" }}
                    >
                      <Checkbox
                        checked={isSelected}
                        onClick={e =>
                          this.handleClick(e, props[0]["identifier"])
                        }
                      />
                    </TableCell>
                    {props.map((prop, key) => {
                      if (prop["identifier"] === undefined) {
                        return (
                          <TableCell
                            key={key}
                            padding={prop.padding}
                            align={prop.align}
                          >
                            {prop.data}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage={"Broj redova po stranici"}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

export default withStyles(style)(CustomTable);
