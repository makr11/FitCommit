import React from 'react';
import CustomInput from '../../../components/CustomInput';

function ServiceForm({...props}){
  const { service, handleInput } = props;
  return(
    <CustomInput
      labelText="Usluga"
      targetName="service"
      input={service}
      handleInput={handleInput}
    />
  )
}

export default ServiceForm;