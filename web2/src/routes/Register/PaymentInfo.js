import React from "react";

import { StripeProvider, Elements } from "react-stripe-elements";

import PaymentMethod from "./PaymentMethod";

const PaymentInfo = () => (
  <React.Fragment>
    <StripeProvider apiKey="pk_test_XI6uj6l209Oxy7lZLQae8UKv00OqYDTzsI">
      <Elements>
        <PaymentMethod />
      </Elements>
    </StripeProvider>
  </React.Fragment>
);

export default PaymentInfo;
