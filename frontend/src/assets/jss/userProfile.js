export const addRecordStyle = theme => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  textField: {
    flexBasis: 200,
    margin: 10
  },
  form: {
    flexDirection: 'row',
  }
});

export const updateRecordFormStyle = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

export const userRecordsTableStyle = () => ({
  tableCell: {
    padding: "4px 40px 4px 24px",
  }
});
