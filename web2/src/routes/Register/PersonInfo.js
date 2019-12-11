import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

import { Email, FirstName, LastName } from "../../components/fields";

const PersonInfo = ({ email, firstname, lastname, onChange, errors }) => {
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
  }, [$email, $firstname, $lastname]);

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Email value={$email.value} onChange={setEmail} required helperText={errors.email} valid={errors.email ? false : undefined} />
      </Grid>
      <Grid item xs={6}>
        <FirstName value={$firstname.value} onChange={setFirstName} />
      </Grid>
      <Grid item xs={6}>
        <LastName value={$lastname.value} onChange={setLastName} />
      </Grid>
    </React.Fragment>
  );
};

PersonInfo.propTypes = {
  email: PropTypes.string,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  onChange: PropTypes.func,
  errors: PropTypes.object
};

export default PersonInfo;
