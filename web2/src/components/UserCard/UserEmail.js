import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

export const formatUserEmail = user => `${user.email}`;

const UserEmail = ({ user }) => (
  <Typography>{formatUserEmail(user)}</Typography>
);

UserEmail.propTypes = {
  user: PropTypes.object
};

export default UserEmail;
