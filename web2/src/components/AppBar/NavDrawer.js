import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { makeStyles, useTheme } from "@material-ui/core";
import DefaultNavIcon from "@material-ui/icons/TransitEnterexit";
import * as routes from "../../routes";

export const drawerWidth = 240;

export const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  }
}));

const NavDrawer = ({ onClose, open, history }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={onClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {Object.entries(routes).map(
          ([key, { label, path, NavIcon, NavItem }]) => {
            return (
              NavItem && (
                <ListItem button key={key} onClick={() => history.push(path)}>
                  <ListItemIcon>
                    {NavIcon ? <NavIcon /> : <DefaultNavIcon />}
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItem>
              )
            );
          }
        )}
      </List>
    </Drawer>
  );
};

NavDrawer.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  history: PropTypes.object
};

export default withRouter(NavDrawer);
