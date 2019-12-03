import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

export const formatUserDisplayName = user =>
  `${user.fname} ${user.lname} <${user.email}>`;

const UserDisplayName = ({ user }) => (
  <Typography>{formatUserDisplayName(user)}</Typography>
);

UserDisplayName.propTypes = {
  user: PropTypes.object
};

export default UserDisplayName;
