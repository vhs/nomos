import React from "react";
import * as routes from "../routes";

const Routes = () => (
  <React.Fragment>
    {Object.entries(routes).map(([key, { Route }]) => {
      return Route && <Route key={key} />;
    })}
  </React.Fragment>
);

export default Routes;
