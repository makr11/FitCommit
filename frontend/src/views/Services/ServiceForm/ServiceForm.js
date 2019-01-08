import React from 'react';
import TextField from '@material-ui/core/TextField';

export function ServiceForm({...props}){
  const { service, handleInput } = props;
  return(
    <TextField
      label="Usluga"
      name="service"
      value={service}
      onChange={handleInput}
    />
  )
}

export function CategoryForm({...props}){
  const { category, handleInput } = props;
  return(
    <TextField
      label="Kategorija"
      name="category"
      value={category}
      onChange={handleInput}
    />
  )
}

export function OptionForm({ ...props }) {
  const { price, arrivals, duration, handleInput } = props;
  return (
    <div>
      <TextField
        label="Cijena"
        name="price"
        type="number"
        value={price}
        onChange={handleInput}
      />
      <TextField
        label="Dolasci"
        name="arrivals"
        type="number"
        value={arrivals}
        onChange={handleInput}
      />
      <TextField
        label="Trajanje"
        name="duration"
        type="number"
        value={duration}
        onChange={handleInput}
      />
    </div>
  )
}