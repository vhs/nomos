import React, { useContext } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core";

import { path as login } from "../../routes/Login";
import { path as welcome } from "../../routes/Welcome";
import { IdentityContext } from "../../providers/Identity";
import UserMenu from "./UserMenu";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  title: {
    flexGrow: 1,
    cursor: "pointer"
  }
}));

const TopToolbar = ({ onOpen, open, history }) => {
  const classes = useStyles();

  const { loading, identity, logout } = useContext(IdentityContext);

  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={onOpen}
        edge="start"
        className={clsx(classes.menuButton, open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        variant="h6"
        noWrap
        className={classes.title}
        onClick={() => history.push(welcome)}
      >
        VHS Membership
      </Typography>
      {!loading && !identity && (
        <Button color="inherit" onClick={() => history.push(login)}>
          Login
        </Button>
      )}
      {!loading && identity && <UserMenu identity={identity} onLogout={logout} />}
    </Toolbar>
  );
};

TopToolbar.propTypes = {
  onOpen: PropTypes.func,
  open: PropTypes.bool,
  history: PropTypes.object
};

export default withRouter(TopToolbar);
