import React, { useContext, useState } from "react";
import { CustomerContext } from "../../../providers/Customer";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { CheckoutContext } from "../../../providers/Checkout";

import PaymentMethodSelector from "./PaymentMethodSelector";
import AddPaymentMethodDialog from "./AddPaymentMethodDialog";

const PaymentMethods = ({ history }) => {
  const {
    loading,
    customer,
    setDefaultPaymentMethod,
    detachPaymentMethod
  } = useContext(CustomerContext);

  const { setPaymentMethod: $setPaymentMethod } = useContext(CheckoutContext);

  const paymentMethods = (customer || {}).paymentMethods || [];
  const defaultMethodId =
    ((customer || {}).invoice_settings || {}).default_payment_method || null;

  const defaultMethod = (
    paymentMethods.find(source => source.id === defaultMethodId) || {
      id: ""
    }
  ).id;

  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(defaultMethod);

  const onBack = () => {
    history.replace("/subscribe/billing");
  };

  const onContinue = () => {
    $setPaymentMethod(
      paymentMethods.find(method => method.id === paymentMethod)
    );
    history.push("/subscribe/confirm");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Card>
        <CardHeader title="Payment Method" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <PaymentMethodSelector
                    disabled={loading}
                    paymentMethods={paymentMethods}
                    defaultMethod={defaultMethod}
                    value={paymentMethod}
                    onChange={setPaymentMethod}
                    onSetDefault={setDefaultPaymentMethod}
                    onDelete={detachPaymentMethod}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={handleOpen}
                    variant="contained"
                    color="secondary"
                  >
                    Add Payment Method
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6}>
                  <Button
                    onClick={onBack}
                    variant="contained"
                    disabled={loading}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onContinue}
                    disabled={loading || !paymentMethod}
                  >
                    {loading ? "..." : "Continue"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <AddPaymentMethodDialog open={open} onClose={handleClose} />
    </React.Fragment>
  );
};

export default PaymentMethods;
