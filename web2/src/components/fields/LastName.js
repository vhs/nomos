import React from "react";

import BaseTextField from "./BaseTextField";

const LastName = props => (
  <BaseTextField
    id="lastname"
    autoComplete="family-name"
    label="Last Name"
    placeholder="Last Name"
    {...props}
  />
);

export default LastName;
