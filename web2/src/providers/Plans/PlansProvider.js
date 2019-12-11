import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

export const PlansContext = React.createContext([]);

const getProductPlans = async () => {
  const resp = await fetch("/services/web/SubscriptionService1.svc/GetPlans");

  return await resp.json();
};

export const PlansProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const refreshPlans = useCallback(() => {
    setLoading(true);
    getProductPlans().then(products => {
      setProducts(products);
      setLoading(false);
    });
  }, [setProducts, setLoading]);

  useEffect(() => {
    refreshPlans();
  }, [refreshPlans]);

  return (
    <PlansContext.Provider
      value={{
        loading,
        products,
        refreshPlans
      }}
    >
      {children}
    </PlansContext.Provider>
  );
};

PlansProvider.propTypes = {
  children: PropTypes.element
};
