import React from "react";

import BaseTextField from "../BaseTextField";

const Country = props => (
  <BaseTextField
    id="country"
    autoComplete="country-name"
    label="Country"
    placeholder="Country"
    {...props}
  />
);

export default Country;
