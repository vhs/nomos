import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  defaultPlan: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  }
}));

const SubscriptionPlan = ({ plan, isSubscribed = false, onSubscribe }) => {
  const classes = useStyles();

  const currency = plan.currency.toUpperCase();
  const price = plan.amount / 100;
  const price_formatted = new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: currency
  }).format(price);

  const interval = `${
    plan.interval_count > 1 ? `${plan.interval_count} ` : ""
  }${plan.interval}${plan.interval_count > 1 ? "s" : ""}`;

  const description = plan.metadata.description;

  const handleSubscribe = () => {
    onSubscribe(plan);
  };

  return (
    <Card className={plan.metadata.default ? classes.defaultPlan : undefined}>
      <CardHeader title={plan.nickname} />
      <CardContent>
        <Typography variant="h6">
          {price_formatted} per {interval}
        </Typography>
        {description && <Typography>{description}</Typography>}
      </CardContent>
      {onSubscribe && (
        <CardActions>
          <Button
            color={plan.metadata.default ? "secondary" : undefined}
            variant="contained"
            onClick={handleSubscribe}
            disabled={isSubscribed}
          >
            {isSubscribed ? "Currently Subscribed" : "Subscribe"}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default SubscriptionPlan;
