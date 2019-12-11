import React, { useContext } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import { IdentityContext } from "../../providers/Identity";

import PaypalUpgrade from "./PaypalUpgrade";
import StripeCheckout from "./Stripe/StripeCheckout";

const Subscribe = () => {
  const { loading, identity } = useContext(IdentityContext);

  if (loading) {
    return <CircularProgress />;
  }

  if (!identity) {
    return <div>Not yet a member? Join us! Otherwise login here.</div>;
  }

  if (identity.paypal_id !== "") {
    return <PaypalUpgrade />;
  }

  return <StripeCheckout />;
};

export default Subscribe;
