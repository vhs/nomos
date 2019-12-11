import React from "react";
import Cards from "./Cards";
import { PrivateRoute } from "../../components/PrivateRoute";

export const path = "/cards";

const Route = () => (
  <PrivateRoute permissions="user" path={path} component={Cards} />
);

export default Route;
