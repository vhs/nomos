import React, { useContext } from "react";
import { SubscriptionsContext } from "../../providers/Subscriptions";
import Subscription from "./Subscription";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const Subscriptions = () => {
  const { loading, subscriptions = [], cancel } = useContext(
    SubscriptionsContext
  );

  const makeHandleCancel = subscription => () => {
    cancel(subscription.id);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={2}>
      {subscriptions.map(subscription => (
        <Grid key={subscription.id} item xs={6}>
          <Subscription
            subscription={subscription}
            onCancel={makeHandleCancel(subscription)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Subscriptions;
