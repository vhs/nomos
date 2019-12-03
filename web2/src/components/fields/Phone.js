import React from "react";

import BaseTextField from "./BaseTextField";

const Phone = props => (
  <BaseTextField
    id="phone"
    autoComplete="phone"
    label="Phone"
    placeholder="Phone"
    {...props}
  />
);

export default Phone;
