import React, { useState } from "react";
import PropTypes from "prop-types";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import UserAvatar from "../UserCard/UserAvatar";
import ThemeToggle from "../ThemeToggle";

const UserMenu = ({ identity, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <UserAvatar
        user={identity}
        aria-haspopup="true"
        aria-label={`${identity.fname} ${identity.lname}`}
        aria-controls="menu-appbar"
        onClick={handleOpen}
      />
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem><ThemeToggle /></MenuItem>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

UserMenu.propTypes = {
  identity: PropTypes.object
};

export default UserMenu;
