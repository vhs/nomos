import React from 'react';

import TextField from "@material-ui/core/TextField";
import useFieldState from "./useFieldState";

export const defaultValidator = () => true;

const BaseTextField = ({ value = "", onChange, disabled = false, required = false, valid, validate = defaultValidator, ...props }) => {
  const [$value, $valid, setValue] = useFieldState({
    value,
    required,
    onChange,
    validate
  });

  return (
    <TextField
      {...props}
      variant="outlined"
      error={valid !== undefined ? !valid : !$valid}
      value={$value}
      onChange={setValue}
      disabled={disabled}
      required={required}
    />
  );
};

export default BaseTextField;
