import React from "react";

import BaseTextField from "../BaseTextField";

const NewPassword = props => (
  <BaseTextField
    id="new-password"
    type="password"
    autoComplete="new-password"
    label="New Password"
    placeholder="New Password"
    {...props}
  />
);

export default NewPassword;
