import React from 'react';
// react select module
import Select from 'react-select';
// material ui core components
import Button from '@material-ui/core/Button';

function UserArrivalsSelect(props){
  const { selectedUser, selectedRecord, usersOpt, recordsOpt, selectUser, selectRecord, submitForm } = props;
  
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


export default UserArrivalsSelect;
