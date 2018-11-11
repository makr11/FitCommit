import React from "react";
import PropTypes from "prop-types";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

function CustomInput({ ...props }) {
  const{
    labelText
  } = props

  return(
    <FormControl>
      <InputLabel>
        {labelText}
      </InputLabel>
      <Input/>
    </FormControl>
  )
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
}

export default CustomInput;