import React from 'react';
import Dashboard from "./Dashboard";
import { PrivateRoute } from "../../components/PrivateRoute";

export const path = "/dashboard";

const Route = () => (
  <PrivateRoute permissions="user" path={path} component={Dashboard} />
);

export default Route;
