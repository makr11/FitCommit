import React from 'react';
import CustomInput from '../../../components/CustomInput';

function UserForm(props){
  const { first_name, last_name, username, password, email, handleInput } = props;
  return(
    <div>
      <CustomInput
        targetName="first_name"
        labelText="Ime"
        input={first_name}
        handleInput={handleInput}
      />
      <CustomInput
        targetName="last_name"
        labelText="Prezime"
        input={last_name}
        handleInput={handleInput}
      />
      <CustomInput
        targetName="username"
        labelText="Korisničko ime"
        input={username}
        handleInput={handleInput}
      />
      <CustomInput
        targetName="password"
        labelText="Lozinka"
        type="password"
        input={password}
        handleInput={handleInput}
      />
      <CustomInput
        targetName="email"
        labelText="E-mail"
        type="email"
        input={email}
        handleInput={handleInput}
      />
    </div>
  )
}

export default UserForm;