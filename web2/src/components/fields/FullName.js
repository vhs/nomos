import React from "react";

import BaseTextField from "./BaseTextField";

const FullName = props => (
  <BaseTextField
    id="name"
    autoComplete="name"
    label="Full Name"
    placeholder="Full Name"
    {...props}
  />
);

export default FullName;
