import React, { useContext } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

import { CustomerContext } from "../../../providers/Customer";
import useForm from "../../../components/form/useForm";
import { FullName, Email, Phone, Address } from "../../../components/fields";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const handleSubmit = (update, onContinue) => fields => {
  const { street, city, province, country, postalCode } = fields.address.value;

  const lines = street.split("\n");

  update(
    {
      address: {
        line1: lines[0],
        line2: lines.length > 1 ? lines.slice(1).join(", ") : undefined,
        city: city,
        postal_code: postalCode,
        state: province,
        country: country
      },
      phone: fields.phone.value !== "" ? fields.phone.value : null
    },
    onContinue
  );
};

const validatePhone = () => {};
const validateAddress = () => {};

const validators = {
  phone: validatePhone,
  address: validateAddress
};

const CustomerProfile = ({ history }) => {
  const { loading, customer, user, update } = useContext(CustomerContext);

  const onBack = () => {
    history.replace("/subscribe");
  };

  const onContinue = () => {
    history.push("/subscribe/confirm");
  };

  const {
    fields: { name, email, phone, address },
    submit
  } = useForm({
    fields: {
      name: customer ? customer.name : `${user.fname} ${user.lname}`,
      email: customer ? customer.email : user.payment_email,
      phone: (customer ? customer.phone : "") || "",
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
    },
    validators: validators,
    onSubmit: handleSubmit(update, onContinue)
  });

  return (
    <Card>
      <CardHeader title="Member Invoice Details" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FullName value={name.value} disabled />
              </Grid>
              <Grid item xs={6}>
                <Email value={email.value} disabled />
              </Grid>
              <Grid item xs={12}>
                <Phone
                  value={phone.value}
                  onChange={phone.setValue}
                  helperText={phone.error}
                  valid={phone.valid}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  While phone number and address are optional from a VHS
                  perspective, they may be required by your payment provider in
                  order to ensure identity. If there is an issue with your name
                  or e-mail address, please contact our member coordinator.
                </Typography>
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
                  disabled={loading}
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
                  onClick={submit}
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? "..." : "Continue"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

CustomerProfile.propTypes = {
  history: PropTypes.object
};

export default CustomerProfile;
