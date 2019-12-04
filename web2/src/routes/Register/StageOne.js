import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import PersonInfo from "./PersonInfo";

const StageOne = ({ onComplete }) => {
  const [info, setInfo] = useState({
    email: "",
    firstname: "",
    lastname: "",
    valid: false
  });

  const onNext = useCallback(() => {
    onComplete(info);
  }, [info, onComplete]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PersonInfo onChange={setInfo} />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={onNext}
          disabled={!info.valid}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

StageOne.propTypes = {
  onComplete: PropTypes.func
};

export default StageOne;
