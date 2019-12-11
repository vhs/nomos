import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import StripePlan from "./StripePlan";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  defaultProduct: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText
  },
  product: {
    backgroundColor: theme.palette.background.default
  }
}));

const planSort = (a, b) => {
  const asort = a.metadata.sort || -1;
  const bsort = b.metadata.sort || -1;

  if (asort > bsort) return 1;
  if (asort < bsort) return -1;

  return 0;
};

const StripeProduct = ({ product, onSubscribe }) => {
  const classes = useStyles();
  const description = product.metadata.description;

  return (
    <Card
      className={
        !product.metadata.default ? classes.defaultProduct : classes.product
      }
    >
      <CardHeader title={product.name} />
      <CardContent>
        <Grid container spacing={2}>
          {description && (
            <Grid item xs={12}>
              <Typography>{description}</Typography>
            </Grid>
          )}
          {product.plans.sort(planSort).map(plan => (
            <Grid key={plan.id} item md={4} xs={12}>
              <StripePlan plan={plan} onSubscribe={onSubscribe} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StripeProduct;
