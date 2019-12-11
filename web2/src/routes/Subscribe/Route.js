import React from "react";
import { Route as DomRoute } from "react-router-dom";
import Subscribe from "./Subscribe";

export const path = "/subscribe";

const Route = () => <DomRoute path={path} component={Subscribe} />;

export default Route;
