import React from "react";
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

import CreditCard from "./CreditCard";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  hiddenRadio: {
    display: "none"
  },
  radioGroup: {
    marginTop: theme.spacing(2)
  }
}));

const PaymentMethodSelector = ({
  disabled,
  paymentMethods,
  value,
  defaultMethod,
  onChange,
  onSetDefault,
  onDelete
}) => {
  const classes = useStyles();

  if (!paymentMethods) {
    return <CircularProgress />;
  }

  if (paymentMethods.length <= 0) {
    return <Typography>No payment methods</Typography>;
  }

  const handleChange = event => {
    onChange(event.target.value);
  };

  const makeHandleSetDefault = id => event => {
    onSetDefault(id);
    event.preventDefault();
  };

  const makeHandleDelete = id => event => {
    onDelete(id);
    event.preventDefault();
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Select Payment Method</FormLabel>
      <RadioGroup
        className={classes.radioGroup}
        aria-label="payment-method"
        name="payment-method"
        value={value}
        onChange={handleChange}
      >
        <Grid container spacing={1}>
          {paymentMethods.map(method => (
            <Grid item xs={12} key={method.id}>
              <FormControlLabel
                value={method.id}
                control={<Radio classes={{ root: classes.hiddenRadio }} />}
                label={
                  <CreditCard
                    disabled={disabled}
                    brand={method.card.brand}
                    last4={method.card.last4}
                    exp_month={method.card.exp_month}
                    exp_year={method.card.exp_year}
                    isHighlighted={method.id === value}
                    isDefault={method.id === defaultMethod}
                    onSetDefault={makeHandleSetDefault(method.id)}
                    onDelete={makeHandleDelete(method.id)}
                  />
                }
              />
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
    </FormControl>
  );
};

export default PaymentMethodSelector;
