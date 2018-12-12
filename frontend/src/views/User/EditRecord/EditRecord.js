import React from 'react';
// material ui core

// material ui core components
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
//app components
import CustomInput from '../../../components/CustomInput';
// app functions
import { dateFormatView } from '../../../assets/js/functions';

function EditRecord(props){
  const { 
    started, 
    ends, 
    freeze, 
    freeze_started,
    freezeDays,
    freeze_ended,
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
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              id="freeze"
              checked={freeze}
              onChange={handleCheckBox}
            />
          }
          label={(freeze)?"Članarina zamrznuta":"Zamrznuti članarinu"}
        />
        {(freeze)?

        <FormGroup>
          <p>Od: {dateFormatView(freeze_started)}</p>
          <p>Do:</p>
          <CustomInput
            targetName="freezeDays"
            labelText="Dani"
            input={freezeDays}
            handleInput={handleInput} 
            shrink={true}
          />
          <CustomInput
            targetName="freeze_ended"
            labelText="Datum"
            type="date"
            input={freeze_ended}
            handleInput={handleInput} 
            shrink={true}
          />
        </FormGroup>:undefined     
        }
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