import React from "react";

import BaseTextField from "./BaseTextField";

const Username = props => (
  <BaseTextField
    id="username"
    autoComplete="username"
    label="Username"
    placeholder="Username"
    {...props}
  />
);

export default Username;
