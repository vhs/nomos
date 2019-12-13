import React from "react";

import BaseTextField from "../BaseTextField";

const Street = props => (
  <BaseTextField
    id="street"
    autoComplete="street-address"
    label="Street Address"
    placeholder="Street Address"
    multiline
    {...props}
  />
);

export default Street;
