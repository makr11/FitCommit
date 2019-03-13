import React from 'react';
// material ui components
import TextField from '@material-ui/core/TextField';

const servicesForm = {
  textField: {
    margin: "3%",
    minWidth: "100px",
  }
}

export function ServiceForm({...props}){
  const { service, handleInput, error } = props;
  return(
    <TextField
      label="Usluga"
      name="service"
      value={service}
      onChange={handleInput}
      style={servicesForm.textField}
      error={error}
    />
  )
};

export function CategoryForm({...props}){
  const { category, handleInput, error } = props;
  return(
    <TextField
      label="Kategorija"
      name="category"
      value={category}
      onChange={handleInput}
      style={servicesForm.textField}
      error={error}
    />
  )
}

export function OptionForm({ ...props }) {
  const { 
    price, 
    arrivals, 
    duration, 
    handleInput, 
    formError 
  } = props;
  return (
    <React.Fragment>
      <TextField
        label="Cijena"
        name="price"
        type="number"
        value={price}
        onChange={handleInput}
        style={servicesForm.textField}
        error={formError.price}
      />
      <TextField
        label="Dolasci"
        name="arrivals"
        type="number"
        value={arrivals}
        onChange={handleInput}
        style={servicesForm.textField}
        error={formError.arrivals}
      />
      <TextField
        label="Trajanje"
        name="duration"
        type="number"
        value={duration}
        onChange={handleInput}
        style={servicesForm.textField}
        error={formError.duration}
      />
    </React.Fragment>
  )
}