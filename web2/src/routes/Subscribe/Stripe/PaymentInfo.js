import React, { useContext } from "react";

import { StripeProvider, Elements } from "react-stripe-elements";
import { CustomerContext } from "../../../providers/Customer";
import PaymentMethod from "./PaymentMethod";

const PaymentInfo = ({ onCreated, onCancel }) => {
  const { stripeAPIKey } = useContext(CustomerContext);

  return (
    <React.Fragment>
      <StripeProvider apiKey={stripeAPIKey.value}>
        <Elements>
          <PaymentMethod onCreated={onCreated} onCancel={onCancel} />
        </Elements>
      </StripeProvider>
    </React.Fragment>
  );
};

export default PaymentInfo;
