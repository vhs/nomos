import React from 'react';

import PaymentInfo from "./PaymentInfo";
import Button from "@material-ui/core/Button";

const StageThree = ({ onComplete }) => (
  <React.Fragment>
    <PaymentInfo />
    <Button variant="contained" color="primary" onClick={onComplete}>Finish</Button>
  </React.Fragment>
);

export default StageThree;
