import React from "react";

import BaseTextField from "./BaseTextField";

export const defaultValidator = value => {
  return /\S+@\S+\.\S+/.test(value);
};

const Email = props => (
  <BaseTextField
    id="email"
    autoComplete="email"
    label="E-Mail"
    placeholder="E-Mail"
    validate={defaultValidator}
    {...props}
  />
);

export default Email;
