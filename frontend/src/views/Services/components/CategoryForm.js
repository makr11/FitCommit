import React from 'react';
import CustomInput from '../../../components/CustomInput';

function CategoryForm({...props}){
  const { category, handleInput } = props;
  return(
    <CustomInput
      labelText="Kategorija"
      targetName="category"
      input={category}
      handleInput={handleInput}
    />
  )
}

export default CategoryForm;