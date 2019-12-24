import React, { useContext, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { injectStripe, CardElement } from "react-stripe-elements";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { ThemeContext } from "../../../components/Theme";
import { CustomerContext } from "../../../providers/Customer";
import { Address, Email, FullName, Phone } from "../../../components/fields";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useForm from "../../../components/form/useForm";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles(theme => ({
  cardElement: {
    border: "solid 1px",
    borderColor:
      theme.palette.type === "light"
        ? "rgba(0, 0, 0, 0.23)"
        : "rgba(255, 255, 255, 0.23)",
    borderRadius: theme.shape.borderRadius,
    padding: "18.5px 14px"
  }
}));

const StyledCardElement = () => {
  const classes = useStyles();
  const { themeObject } = useContext(ThemeContext);

  return (
    <div className={classes.cardElement}>
      <CardElement
        style={{
          base: {
            color: themeObject.palette.text.primary
          }
        }}
      />
    </div>
  );
};

const validatePhone = () => {};
const validateAddress = () => {};

const validators = {
  phone: validatePhone,
  address: validateAddress
};

const handleSubmit = (
  stripe,
  attachPaymentMethod,
  onCreated,
  setLoading,
  setError
) => fields => {
  const { name, email, phone, address } = fields;
  const { street, city, province, country, postalCode } = address.value;

  const lines = street.split("\n");

  const countryCode = country.toLowerCase() === "canada" ? "CA" : country;

  setLoading(true);
  stripe
    .createPaymentMethod("card", {
      billing_details: {
        name: name.value,
        email: email.value,
        phone: phone.value,
        address: {
          line1: lines[0],
          line2: lines.length > 1 ? lines.slice(1).join(", ") : undefined,
          city: city,
          postal_code: postalCode,
          state: province,
          country: countryCode
        }
      }
    })
    .then(({ paymentMethod, error }) => {
      if (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
        return;
      }

      setError("");

      console.log("Received Stripe PaymentMethod:", paymentMethod);
      attachPaymentMethod(paymentMethod.id);
      onCreated(paymentMethod.id);
      setLoading(false);
    });
};

const PaymentMethod = ({ stripe, onCreated, onCancel }) => {
  const {
    loading: customerLoading,
    customer,
    user,
    attachPaymentMethod
  } = useContext(CustomerContext);
  const [stripeLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [billingInfoSame, setBillingInfoSame] = useState(true);

  const loading = customerLoading || stripeLoading;

  const defaultBillingInfo = {
    name: customer ? customer.name : `${user.fname} ${user.lname}`,
    email: customer ? customer.email : user.payment_email,
    phone: customer ? customer.phone : "",
    address:
      customer && customer.address
        ? {
            street: `${customer.address.line1}\n${customer.address.line2}`,
            city: customer.address.city,
            province: customer.address.state,
            country: customer.address.country,
            postalCode: customer.address.postal_code
          }
        : {
            street: "",
            city: "",
            province: "",
            country: "",
            postalCode: ""
          }
  };

  const {
    fields: { name, email, phone, address },
    submit
  } = useForm({
    fields: defaultBillingInfo,
    validators: validators,
    onSubmit: handleSubmit(
      stripe,
      attachPaymentMethod,
      onCreated,
      setLoading,
      setError
    )
  });

  const handleBillingInfoSame = useCallback(() => {
    setBillingInfoSame(!billingInfoSame);
  }, [billingInfoSame]);

  return (
    <Grid container spacing={2}>
      <Grid item md={6} xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FullName
              value={name.value}
              onChange={name.setValue}
              helperText={name.error}
              valid={name.valid}
              disabled={loading || billingInfoSame}
            />
          </Grid>
          <Grid item xs={6}>
            <Email
              value={email.value}
              onChange={email.setValue}
              helperText={email.error}
              valid={email.valid}
              disabled={loading || billingInfoSame}
            />
          </Grid>
          <Grid item xs={12}>
            <Phone
              value={phone.value}
              onChange={phone.setValue}
              helperText={phone.error}
              valid={phone.valid}
              disabled={loading || billingInfoSame}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StyledCardElement />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={billingInfoSame}
                      onChange={handleBillingInfoSame}
                      color="primary"
                    />
                  }
                  label="Billing information is the same as my member information"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item md={6} xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Address
              address={address.value}
              onChange={address.setValue}
              helperText={address.error}
              valid={address.valid}
              disabled={loading || billingInfoSame}
            />
          </Grid>
        </Grid>
      </Grid>

      {error !== "" && (
        <Grid item xs={12}>
          <Typography style={{ color: "red" }}>{error}</Typography>
        </Grid>
      )}

      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button variant="contained" onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={submit}
              disabled={loading}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

PaymentMethod.propTypes = {
  stripe: PropTypes.object
};

export default injectStripe(PaymentMethod);
