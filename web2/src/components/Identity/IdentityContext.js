import React, { useEffect, useState } from 'react';

const initialIdentity = {};

export const IdentityContext = React.createContext(initialIdentity);

const getIdentity = async () => fetch('/services/web/AuthService1.svc/CurrentUser').then(res => res.json());

export const IdentityProvider = ({ children }) => {
  const [identity, setIdentity] = useState(initialIdentity);
  
  const [isLoading, setIsLoading] = useState(false);
  
  const [error, setError] = useState(null);
  
  const refreshIdentity = () => {
    setIsLoading(true);
    getIdentity().then(ident => {
      setIdentity(ident);
      setIsLoading(false);
    }).catch(e => {
      setError(e);
    });
  };
  
  useEffect(() => {
    refreshIdentity();
  }, [setIdentity]);
  
  if (error) {
    return (
      <div>Fatal {JSON.stringify(error)}</div>
    );
  }
  
  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }
  
  return (
    <IdentityContext.Provider value={[identity, refreshIdentity]}>
      {children}
    </IdentityContext.Provider>
  );
};
