import React from "react";

import BaseTextField from "../BaseTextField";

const PostalCode = props => (
  <BaseTextField
    id="postal-code"
    autoComplete="postal-code"
    label="Postal Code"
    placeholder="Postal Code"
    {...props}
  />
);

export default PostalCode;
