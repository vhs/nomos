import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { injectStripe, CardElement } from "react-stripe-elements";
import Button from "@material-ui/core/Button";

import { Email, FirstName, LastName, Phone } from "../../components/fields";

const PaymentMethod = ({ stripe }) => {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState({ valid: true, value: "" });
  const [firstname, setFirstName] = useState({ valid: true, value: "" });
  const [lastname, setLastName] = useState({ valid: true, value: "" });
  const [phone, setPhone] = useState({ valid: true, value: "" });

  const addPaymentMethod = () => {
    setLoading(true);
    stripe
      .createPaymentMethod("card", {
        billing_details: {
          name: `${firstname.value} ${lastname.value}`,
          email: email.value,
          phone: phone.value
        }
      })
      .then(({ paymentMethod, error }) => {
        setLoading(false);
        if (error) {
          console.log(error);
        }

        console.log("Received Stripe PaymentMethod:", paymentMethod);
      });
  };

  const valid = useMemo(
    () => email.valid && firstname.valid && lastname.valid && phone.valid,
    [email, firstname, lastname, phone]
  );

  return (
    <React.Fragment>
      <Email value={email.value} onChange={setEmail} required />
      <FirstName value={firstname.value} onChange={setFirstName} />
      <LastName value={lastname.value} onChange={setLastName} />
      <Phone value={phone.value} onChange={setPhone} />
      <CardElement />
      <Button onClick={addPaymentMethod} disabled={loading || !valid}>
        Add
      </Button>
    </React.Fragment>
  );
};

PaymentMethod.propTypes = {
  stripe: PropTypes.object
};

export default injectStripe(PaymentMethod);
