import React from "react";
import Example from "./Example";
import { PrivateRoute } from "../../components/PrivateRoute";

export const path = "/dashboard";

const Route = () => (
  <PrivateRoute permissions="user" path={path} component={Example} />
);

export default Route;
