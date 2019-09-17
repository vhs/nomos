import React from 'react';
import Typography from "@material-ui/core/Typography";

export const formatUserDisplayName = user => `${user.fname} ${user.lname} <${user.email}>`;

const UserDisplayName = ({ user }) => (
  <Typography>{formatUserDisplayName(user)}</Typography>
);

export default UserDisplayName;
