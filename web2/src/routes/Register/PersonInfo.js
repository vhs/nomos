import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

import { Email, FirstName, LastName } from "../../components/fields";

const PersonInfo = ({ email, firstname, lastname, onChange }) => {
  const [$email, setEmail] = useState({ valid: true, value: email });
  const [$firstname, setFirstName] = useState({
    valid: true,
    value: firstname
  });
  const [$lastname, setLastName] = useState({ valid: true, value: lastname });

  useEffect(() => {
    onChange({
      email: $email.value,
      firstname: $firstname.value,
      lastname: $lastname.value,
      valid: $email.valid && $firstname.valid && $lastname.valid
    });
  }, [email, firstname, lastname]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Email value={$email.value} onChange={setEmail} required />
      </Grid>
      <Grid item xs={6}>
        <FirstName value={$firstname.value} onChange={setFirstName} />
      </Grid>
      <Grid item xs={6}>
        <LastName value={$lastname.value} onChange={setLastName} />
      </Grid>
    </Grid>
  );
};

PersonInfo.propTypes = {
  email: PropTypes.string,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  onChange: PropTypes.func
};

export default PersonInfo;
