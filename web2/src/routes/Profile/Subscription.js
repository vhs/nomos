import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  defaultPlan: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  }
}));

const SubscriptionItem = ({ item }) => {
  const { plan } = item;

  const currency = plan.currency.toUpperCase();
  const price = plan.amount / 100;
  const price_formatted = new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: currency
  }).format(price);

  const interval = `${
    plan.interval_count > 1 ? `${plan.interval_count} ` : ""
  }${plan.interval}${plan.interval_count > 1 ? "s" : ""}`;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        {plan.nickname}
      </Grid>
      <Grid item xs={6}>
        {price_formatted}/{interval}
      </Grid>
    </Grid>
  );
};

const Subscription = ({ subscription, onCancel }) => {
  // const classes = useStyles();

  const { latest_invoice } = subscription;

  const currency = latest_invoice.currency.toUpperCase();
  const total = latest_invoice.total / 100;
  const total_formatted = new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: currency
  }).format(total);

  const start_formatted = moment
    .unix(subscription.current_period_start)
    .format("ll");
  const end_formatted = moment
    .unix(subscription.current_period_end)
    .format("ll");
  const period = `${start_formatted} to ${end_formatted}`;

  // TODO add option to modify
  // TODO add cancellation confirmation

  return (
    <Card>
      <CardHeader title="Subscription" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            Started {moment.unix(subscription.start_date).format("ll")}
          </Grid>
          <Grid item xs={12}>
            {subscription.items.data.map(item => (
              <SubscriptionItem key={item.id} item={item} />
            ))}
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                Latest Invoice
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={6}>
                    Period
                  </Grid>
                  <Grid item xs={6}>
                    Total
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={6}>
                    {period}
                  </Grid>
                  <Grid item xs={6}>
                    {total_formatted} {latest_invoice.status}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={onCancel}>Cancel</Button>
        <Button variant="contained">Modify</Button>
      </CardActions>
    </Card>
  );
};

export default Subscription;
