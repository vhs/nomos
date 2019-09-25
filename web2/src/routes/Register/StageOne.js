import React, { useState } from 'react';

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import PersonInfo from "./PersonInfo";

const StageOne = ({ onComplete }) => {
  const [info, setInfo] = useState({
    email: '',
    firstname: '',
    lastname: '',
    valid: false
  });

  return (
    <Paper>
      <PersonInfo onChange={setInfo}/>
      <Button variant="contained" color="primary" onClick={onComplete} disabled={!info.valid}>Next</Button>
    </Paper>
  );
};

export default StageOne;
