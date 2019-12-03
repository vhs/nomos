import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Typography from "@material-ui/core/Typography";

export const formatUserSeniority = user =>
  `Member for ${moment(user.created).fromNow(true)}`;

const UserSeniority = ({ user }) => (
  <Typography>{formatUserSeniority(user)}</Typography>
);

UserSeniority.propTypes = {
  user: PropTypes.object
};

export default UserSeniority;
