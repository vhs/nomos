import React from 'react';
import moment from 'moment';
import Typography from "@material-ui/core/Typography";

export const formatUserSeniority = user => `Member for ${moment(user.created).fromNow(true)}`;

const UserSeniority = ({ user }) => (
  <Typography>{formatUserSeniority(user)}</Typography>
);

export default UserSeniority;
