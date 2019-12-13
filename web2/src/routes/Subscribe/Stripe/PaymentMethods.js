import React, { useContext } from "react";

import { CustomerContext } from "../../../providers/Customer";

const PaymentMethods = () => {
  const { loading, customer } = useContext(CustomerContext);

  return <div>{JSON.stringify(customer)}</div>;
};

export default PaymentMethods;
