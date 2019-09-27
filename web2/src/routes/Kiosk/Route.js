import React from 'react';
import { Route as DomRoute } from 'react-router-dom';
import Kiosk from "./Kiosk";

export const path = "/kiosk";

const Route = () => (
  <DomRoute path={path} component={Kiosk} />
);

export default Route;
