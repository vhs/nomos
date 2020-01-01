import React, { useContext } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import { IdentityContext } from "../../providers/Identity";

import PaypalUpgrade from "./PaypalUpgrade";
import Checkout from "./Stripe/Checkout";

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

  return <Checkout />;
};

export default Subscribe;
