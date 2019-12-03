import React from "react";

import BaseTextField from "./BaseTextField";

const FirstName = props => (
  <BaseTextField
    id="firstname"
    autoComplete="given-name"
    label="First Name"
    placeholder="First Name"
    {...props}
  />
);

export default FirstName;
