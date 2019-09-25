import React from 'react';

import UserInfo from "./UserInfo";
import Button from "@material-ui/core/Button";

const StageTwo = ({ onComplete }) => (
  <React.Fragment>
    <UserInfo onChange={info => console.log(info)} />
    <Button variant="contained" color="primary" onClick={onComplete}>Next</Button>
  </React.Fragment>
);

export default StageTwo;
