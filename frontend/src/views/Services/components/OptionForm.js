import React from 'react';
import CustomInput from '../../../components/CustomInput';

function OptionsForm({ ...props }) {
  const { price, quantity, duration, handleInput } = props;
  return (
    <div>
      <CustomInput
        labelText="Cijena"
        targetName="price"
        input={price}
        handleInput={handleInput}
      />
      <CustomInput
        labelText="Dolasci"
        targetName="quantity"
        input={quantity}
        handleInput={handleInput}
      />
      <CustomInput
        labelText="Trajanje"
        targetName="duration"
        input={duration}
        handleInput={handleInput}
      />
    </div>
  )
}

export default OptionsForm;