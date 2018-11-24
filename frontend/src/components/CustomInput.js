import React from "react";
// prop types check
import PropTypes from "prop-types";
// material ui components
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

function CustomInput({ ...props }) {
  const{
    labelText,
    targetName,
    input,
    handleInput,
    adornments,
    type
  } = props

  return(
    <FormControl>
      <InputLabel>
        {labelText}
      </InputLabel>
      <Input 
        name={targetName} 
        type={type}
        value={input} 
        endAdornment={adornments}
        onChange={handleInput}
        />
    </FormControl>
  )
}

CustomInput.propTypes = {
  labelText: PropTypes.node.isRequired,
  targetName: PropTypes.string.isRequired,
  input: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleInput: PropTypes.func,

}

export default CustomInput;