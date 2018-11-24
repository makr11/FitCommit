import React from 'react';
// material ui core

// material ui core components
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
//app components
import CustomInput from '../../../components/CustomInput';

function EditRecord(props){
  const { 
    started, 
    ends, 
    onHold, 
    arrivals_left, 
    nett_price, 
    discount, 
    active,
    paid,
    handleInput,
    handleCheckBox } = props

  return (
    <div>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              id="paid"
              checked={paid}
              onChange={handleCheckBox}
            />
          }
          label="Plaćeno"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="active"
              checked={active}
              onChange={handleCheckBox}
            />
          }
          label="Aktivna"
        />
      </FormGroup>
      <FormGroup row>
        <CustomInput
          targetName="started"
          labelText="Početak"
          type="date"
          input={started}         
          handleInput={handleInput}
        />
        <CustomInput
          targetName="ends"
          labelText="Istek"
          type="date"
          input={ends}
          handleInput={handleInput}
        />
      </FormGroup>
      <FormGroup>
        <CustomInput
          targetName="onHold"
          labelText="Dani zamrzavanja"
          type="number"
          input={onHold}
          handleInput={handleInput}
        />
        <CustomInput
          targetName="arrivals_left"
          labelText="Dolasci"
          type="number"
          input={arrivals_left}
          handleInput={handleInput}
        />
      </FormGroup>     
      <FormGroup row>
        <CustomInput
          targetName="discount"
          labelText="Popust"
          input={discount}
          handleInput={handleInput}
          adornments={
              <InputAdornment variant="filled" position="end">
                %
              </InputAdornment>
            }
        />
        <CustomInput
          targetName="nett_price"
          labelText="Cijena sa popustom"
          input={nett_price}
          adornments={
              <InputAdornment variant="filled" position="end">
                Kn
              </InputAdornment>
            }
        />
      </FormGroup>
    </div> 
  );
}

export default EditRecord;