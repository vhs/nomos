import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

export const formatUserLoginName = user => `@${user.username}`;

const UserLoginName = ({ user }) => (
  <Typography>{formatUserLoginName(user)}</Typography>
);

UserLoginName.propTypes = {
  user: PropTypes.object
};

export default UserLoginName;
