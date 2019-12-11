import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";

import UserStanding from "./UserStanding";

import { formatUserDisplayName } from "./UserDisplayName";

const UserAvatar = ({ user, onClick, ...rest }) => (
  <IconButton
    aria-label={rest["aria-label"]}
    aria-controls={rest["aria-controls"]}
    aria-haspopup={rest["aria-haspopup"]}
    onClick={onClick}
  >
    <Badge
      overlap="circle"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      badgeContent={<UserStanding user={user} />}
    >
      <Avatar
        {...rest}
        alt={formatUserDisplayName(user)}
        src={`https://www.gravatar.com/avatar/${user.email}?s=64&d=http%3A%2F%2Florempixel.com%2F64%2F64%2Fpeople%2F`}
      />
    </Badge>
  </IconButton>
);

UserAvatar.propTypes = {
  user: PropTypes.object,
  onClick: PropTypes.func
};

export default UserAvatar;
