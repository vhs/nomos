import React, { useContext } from "react";
import { CheckoutContext } from "../../../providers/Checkout";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import SubscriptionPlan from "./SubscriptionPlan";
import CreditCard from "./CreditCard";
import { Redirect } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { SubscriptionsContext } from "../../../providers/Subscriptions";

const Confirm = ({ history }) => {
  const { plan, paymentMethod } = useContext(CheckoutContext);
  const { loading, subscribe, subscriptions } = useContext(
    SubscriptionsContext
  );

  if (!plan) {
    return <Redirect to="/subscribe" />;
  }

  if (!paymentMethod) {
    return <Redirect to="/subscribe/payment" />;
  }

  if (
    subscriptions &&
    subscriptions.length > 0 &&
    subscriptions.some(subscription => subscription.plan.id === plan.id)
  ) {
    return <div>thank you</div>;
  }

  const onBack = () => {
    history.replace("/subscribe");
  };

  const onConfirm = () => {
    subscribe({
      items: [
        {
          id: plan.id,
          quantity: 1
        }
      ],
      paymentmethodid: paymentMethod.id
    });
  };

  return (
    <Card>
      <CardHeader title="Confirm Subscription" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>
              Your first subscription payment will be billed immediately and
              renew each period on this day.
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SubscriptionPlan plan={plan} />
              </Grid>
              <Grid item xs={12}>
                <CreditCard
                  disabled
                  hideActions
                  brand={paymentMethod.card.brand}
                  last4={paymentMethod.card.last4}
                  exp_month={paymentMethod.card.exp_month}
                  exp_year={paymentMethod.card.exp_year}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6}>
                <Button onClick={onBack} variant="contained" disabled={loading}>
                  Back
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onConfirm}
                  disabled={loading || !paymentMethod}
                >
                  {loading ? "..." : "Confirm"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Confirm;
