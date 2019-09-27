import React from 'react';
import { Route as DomRoute } from 'react-router-dom';
import Welcome from "./Welcome";

export const path = "/";

const Route = () => (
  <DomRoute path={path} component={Welcome} exact />
);

export default Route;
