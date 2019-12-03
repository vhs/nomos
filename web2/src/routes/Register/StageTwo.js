import React from "react";
import PropTypes from "prop-types";
import UserInfo from "./UserInfo";
import Button from "@material-ui/core/Button";

const StageTwo = ({ onComplete }) => (
  <React.Fragment>
    <UserInfo onChange={info => console.log(info)} />
    <Button variant="contained" color="primary" onClick={onComplete}>
      Next
    </Button>
  </React.Fragment>
);

StageTwo.propTypes = {
  onComplete: PropTypes.func
};

export default StageTwo;
