import React, { useContext } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

import StripeProduct from "./StripeProduct";

import { PlansContext } from "../../../providers/Plans";
import { CheckoutContext } from "../../../providers/Checkout";

const productSort = (a, b) => {
  const asort = a.metadata.sort || -1;
  const bsort = b.metadata.sort || -1;

  if (asort > bsort) return 1;
  if (asort < bsort) return -1;

  return 0;
};

const StripePlans = ({ history }) => {
  const { loading, products } = useContext(PlansContext);
  const { setPlan } = useContext(CheckoutContext);

  if (loading) {
    return <CircularProgress />;
  }

  const handleSubscribe = plan => {
    setPlan(plan);
    history.push("/subscribe/billing");
  };

  return (
    <Grid container spacing={2}>
      {products.sort(productSort).map(product => (
        <Grid key={product.id} item xs={12}>
          <StripeProduct product={product} onSubscribe={handleSubscribe} />
        </Grid>
      ))}
    </Grid>
  );
};

export default StripePlans;
