import React from 'react';
import { Route as DomRoute } from 'react-router-dom';
import Register from "./Register";

export const path = "/register";

const Route = () => (
  <DomRoute path={path} component={Register} />
);

export default Route;
