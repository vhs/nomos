import React from "react";

import BaseTextField from "../BaseTextField";

const City = props => (
  <BaseTextField
    id="city"
    autoComplete="address-level2"
    label="City"
    placeholder="City"
    {...props}
  />
);

export default City;
