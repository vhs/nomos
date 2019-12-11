import React, { useContext } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import { IdentityContext } from "../../providers/Identity";

import PaypalUpgrade from "./PaypalUpgrade";
import StripePlans from "./Stripe/StripePlans";

const Subscribe = () => {
  const { loading, identity } = useContext(IdentityContext);

  if (loading) {
    return <CircularProgress />;
  }

  if (identity.paypal_id !== "") {
    return <PaypalUpgrade />;
  }

  return <StripePlans />;
};

export default Subscribe;
