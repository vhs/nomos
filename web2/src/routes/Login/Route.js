import React from 'react';
import { Route as DomRoute } from 'react-router-dom';
import Login from "./Login";

export const path = "/login";

const Route = () => (
  <DomRoute path={path} component={Login} />
);

export default Route;
