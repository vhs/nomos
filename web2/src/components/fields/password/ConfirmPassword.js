import React from "react";

import BaseTextField from "../BaseTextField";

const ConfirmPassword = props => (
  <BaseTextField
    id="confirm-password"
    type="password"
    autoComplete="new-password"
    label="Confirm Password"
    placeholder="Confirm Password"
    {...props}
  />
);

export default ConfirmPassword;
