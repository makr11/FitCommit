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
  } = props

  return(
    <FormControl>
      <InputLabel>
        {labelText}
      </InputLabel>
      <Input name={targetName} value={input} onChange={handleInput}/>
    </FormControl>
  )
}

CustomInput.propTypes = {
  labelText: PropTypes.node.isRequired,
  targetName: PropTypes.string.isRequired,
  input: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
}

export default CustomInput;