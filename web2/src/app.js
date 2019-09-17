import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { IdentityProvider } from './components/Identity';
import { PrivateRoute } from './components/PrivateRoute';

import { Dashboard } from './components/Dashboard';
import { Welcome } from './components/Welcome';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Kiosk } from './components/Kiosk';

export const App = () => (
  <React.Fragment>
    <CssBaseline />
    <IdentityProvider>
      <Router>
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/kiosk" component={Kiosk} />
          <PrivateRoute permissions="user" path="/" component={Dashboard} />
        </Switch>
      </Router>
    </IdentityProvider>
  </React.Fragment>
);

export default App;
