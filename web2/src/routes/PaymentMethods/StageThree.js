import React from "react";
import PropTypes from "prop-types";
import PaymentInfo from "./PaymentInfo";
import Button from "@material-ui/core/Button";

const StageThree = ({ onComplete }) => (
  <React.Fragment>
    <PaymentInfo />
    <Button variant="contained" color="primary" onClick={onComplete}>
      Finish
    </Button>
  </React.Fragment>
);

StageThree.propTypes = {
  onComplete: PropTypes.func
};

export default StageThree;
