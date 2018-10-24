import React from 'react';
import Button from '@material-ui/core/Button';
import Select from 'react-select';

class UserArrivalsSelect extends React.Component {

  render() {

    const { selectedUser, selectedRecord, usersOpt, recordsOpt, selectUser, selectRecord, submitForm } = this.props;
    console.log(selectedRecord)
    return(
      <form onSubmit={submitForm} noValidate autoComplete="off">
        <Select
          value={selectedUser}
          onChange={selectUser}
          options={usersOpt}
        />
        <Select
          value={selectedRecord}
          onChange={selectRecord}
          options={recordsOpt}
        />
        <Button
          variant="outlined"
          color="primary"
          type="submit"
        >
          Izaberi
        </Button>
      </form>
    )
  }
}

export default UserArrivalsSelect;
