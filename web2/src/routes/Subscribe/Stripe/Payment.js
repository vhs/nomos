import React, { useContext } from "react";

import { CustomerContext } from "../../../providers/Customer";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

const Payment = () => {
  const { loading, customer } = useContext(CustomerContext);

  return (
    <Card>
      <CardHeader title="Select Payment" />
      <CardContent>
        <Grid container>
          <Grid item xs={12}></Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Payment;
