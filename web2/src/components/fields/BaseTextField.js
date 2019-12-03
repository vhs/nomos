import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import useFieldState from "./useFieldState";

export const defaultValidator = () => true;

const BaseTextField = ({
  value = "",
  onChange,
  disabled = false,
  required = false,
  valid,
  validate = defaultValidator,
  ...props
}) => {
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
      fullWidth
      error={valid !== undefined ? !valid : !$valid}
      value={$value}
      onChange={setValue}
      disabled={disabled}
      required={required}
    />
  );
};

BaseTextField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  valid: PropTypes.bool,
  validate: PropTypes.func
};

export default BaseTextField;
