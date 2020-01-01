import React, { useContext } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

import SubscriptionProduct from "./SubscriptionProduct";

import { PlansContext } from "../../../providers/Plans";
import { CheckoutContext } from "../../../providers/Checkout";
import { SubscriptionsContext } from "../../../providers/Subscriptions";

const productSort = (a, b) => {
  const asort = a.metadata.sort || -1;
  const bsort = b.metadata.sort || -1;

  if (asort > bsort) return 1;
  if (asort < bsort) return -1;

  return 0;
};

const SubscriptionPlans = ({ history }) => {
  const { loading: plansLoading, products } = useContext(PlansContext);
  const { setPlan } = useContext(CheckoutContext);
  const { loading: subscriptionsLoading, subscriptions = [] } = useContext(
    SubscriptionsContext
  );

  const loading = plansLoading || subscriptionsLoading;

  if (loading) {
    return <CircularProgress />;
  }

  const handleSubscribe = plan => {
    setPlan(plan);
    history.push("/subscribe/confirm");
  };

  // TODO add support for subscription addons ie, pay-what-you-want extra donations and pay-by-usage laser
  // TODO should enforce that only one membership plan subscription is subscribe-able

  return (
    <Grid container spacing={2}>
      {products.sort(productSort).map(product => (
        <Grid key={product.id} item xs={12}>
          <SubscriptionProduct
            product={product}
            subscriptions={subscriptions.filter(sub =>
              sub.items.data.some(item => item.plan.product === product.id)
            )}
            onSubscribe={handleSubscribe}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default SubscriptionPlans;
