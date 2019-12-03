import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import { IdentityContext } from "../Identity";

const PrivateRoute = ({ permissions, component: Component, ...rest }) => {
  const { hasPermissions, isLoading } = useContext(IdentityContext);

  return (
    <Route
      {...rest}
      render={props => {
        if (isLoading) {
          return <CircularProgress />;
        }

        if (hasPermissions(...permissions.split(","))) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/welcome",
                // eslint-disable-next-line react/prop-types
                from: props.location,
                push: true
              }}
            />
          );
        }
      }}
    />
  );
};

PrivateRoute.propTypes = {
  permissions: PropTypes.string,
  component: PropTypes.elementType
};

export default PrivateRoute;