import React from 'react';
import Typography from "@material-ui/core/Typography";

export const formatUserEmail = user => `${user.email}`;

const UserEmail = ({ user }) => (
  <Typography>{formatUserEmail(user)}</Typography>
);

export default UserEmail;
