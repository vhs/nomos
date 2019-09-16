import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { IdentityProvider } from './components/Identity';
//import { PrivilegeRoute } from './components/PrivilegeRoute';

import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Kiosk } from './components/Kiosk';

export const App = () => (
  <React.Fragment>
    <CssBaseline />
    <IdentityProvider>
      <Router>
        <Route path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/kiosk" component={Kiosk} />
      </Router>
    </IdentityProvider>
  </React.Fragment>
);

export default App;
