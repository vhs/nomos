import React from "react";
import { makeStyles } from "@material-ui/core";

import { BrowserRouter as Router, Switch } from "react-router-dom";
import { IdentityProvider } from "./providers/Identity";

import { AppBar } from "./components/AppBar";
import Routes from "./components/Routes";
import Theme from "./components/Theme";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex"
  }
}));

export const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Theme>
        <IdentityProvider>
          <Router>
            <AppBar>
              <Switch>
                <Routes />
              </Switch>
            </AppBar>
          </Router>
        </IdentityProvider>
      </Theme>
    </div>
  );
};

export default App;
