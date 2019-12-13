import React from "react";

import BaseTextField from "../BaseTextField";

const Province = props => (
  <BaseTextField
    id="province"
    autoComplete="address-level1"
    label="Province"
    placeholder="Province"
    {...props}
  />
);

export default Province;
