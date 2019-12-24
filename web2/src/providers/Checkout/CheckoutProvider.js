import React, { useState } from "react";
import PropTypes from "prop-types";

export const CheckoutContext = React.createContext(null);

export const CheckoutProvider = ({ children }) => {
  const [plan, setPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  return (
    <CheckoutContext.Provider
      value={{
        plan,
        setPlan,
        paymentMethod,
        setPaymentMethod
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

CheckoutProvider.propTypes = {
  children: PropTypes.element
};
