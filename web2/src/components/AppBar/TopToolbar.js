import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import {makeStyles} from "@material-ui/core";

import { path as login } from '../../routes/Login';
import { path as welcome } from '../../routes/Welcome';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  title: {
    flexGrow: 1,
    cursor: "pointer"
  }
}));

const TopToolbar = ({ onOpen, open, history }) => {
  const classes = useStyles();

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
      <Typography variant="h6" noWrap className={classes.title} onClick={() => history.push(welcome)}>
        VHS Membership
      </Typography>
      <Button color="inherit" onClick={() => history.push(login)}>Login</Button>
    </Toolbar>
  );
};

export default withRouter(TopToolbar);
