import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";

const initialIdentity = false;

export const IdentityContext = React.createContext(initialIdentity);

const getIdentity = async () =>
  fetch("/services/web/AuthService1.svc/CurrentUser")
    .then(res => res.json())
    .then(async identity => {
      if (!(identity && identity.id)) return false;

      const [user, standings] = await Promise.all([
        fetch(
          `/services/web/UserService1.svc/GetUser?userid=${identity.id}`
        ).then(res => res.json()),
        fetch(
          `/services/web/UserService1.svc/GetStanding?userid=${identity.id}`
        ).then(res => res.json())
      ]);

      return {
        ...identity,
        ...user,
        isGoodStanding: standings
      };
    });

const getLogout = async () =>
  fetch("/services/web/AuthService1.svc/Logout").then(res => res.json());

const postLogin = async (username, password) =>
  fetch("/services/web/AuthService1.svc/Login", {
    method: "POST",
    body: JSON.stringify({ username, password })
  }).then(res => res.json());

const hasPermissions = identity => (...permissions) =>
  permissions.every(permission =>
    identity && identity.permissions
      ? identity.permissions.includes(permission)
      : false
  );

export const IdentityProvider = ({ children }) => {
  const [identity, setIdentity] = useState(initialIdentity);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const refreshIdentity = () => {
    setLoading(true);
    getIdentity()
      .then(ident => {
        setIdentity(ident);
        setLoading(false);
      })
      .catch(e => {
        setError(e);
      });
  };

  const logout = () => {
    setLoading(true);
    getLogout()
      .then(() => {
        return refreshIdentity();
      })
      .catch(e => {
        setError(e);
      });
  };

  const login = (username, password) => {
    setLoading(true);
    postLogin(username, password)
      .then(result => {
        if (result !== "Access Granted") {
          setError(result);
          setLoading(false);
          return;
        }

        return refreshIdentity();
      })
      .catch(e => {
        setError(e);
      });
  };

  useEffect(() => {
    refreshIdentity();
  }, [setIdentity]);

  const $hasPermissions = useMemo(() => hasPermissions(identity), [identity]);

  return (
    <IdentityContext.Provider
      value={{
        identity,
        refreshIdentity,
        login,
        logout,
        hasPermissions: $hasPermissions,
        loading,
        error
      }}
    >
      {children}
    </IdentityContext.Provider>
  );
};

IdentityProvider.propTypes = {
  children: PropTypes.node
};
