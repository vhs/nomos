import React from "react";
import { Route as DomRoute } from "react-router-dom";
import Profile from "./Profile";

export const path = "/profile";

const Route = () => <DomRoute path={path} component={Profile} />;

export default Route;
