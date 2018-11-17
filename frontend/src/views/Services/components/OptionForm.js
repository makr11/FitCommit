import React from 'react';
import CustomInput from '../../../components/CustomInput';

function OptionsForm({ ...props }) {
  const { price, arrivals, duration, handleInput } = props;
  return (
    <div>
      <CustomInput
        labelText="Cijena"
        targetName="price"
        type="number"
        input={price}
        handleInput={handleInput}
      />
      <CustomInput
        labelText="Dolasci"
        targetName="arrivals"
        type="number"
        input={arrivals}
        handleInput={handleInput}
      />
      <CustomInput
        labelText="Trajanje"
        targetName="duration"
        type="number"
        input={duration}
        handleInput={handleInput}
      />
    </div>
  )
}

export default OptionsForm;