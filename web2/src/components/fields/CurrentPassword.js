import React from 'react';

import BaseTextField from "./BaseTextField";

const CurrentPassword = (props) => (
  <BaseTextField
    id="current-password"
    type="password"
    autoComplete="current-password"
    label="Current Password"
    placeholder="Current Password"
    {...props}
  />
);

export default CurrentPassword;
