import React from 'react';
import Typography from "@material-ui/core/Typography";

export const formatUserLoginName = user => `@${user.username}`;

const UserLoginName = ({ user }) => (
  <Typography>{formatUserLoginName(user)}</Typography>
);

export default UserLoginName;
