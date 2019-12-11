import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { NewPassword, ConfirmPassword, useNewPasswordState } from "../../components/fields/password";
import Grid from "@material-ui/core/Grid";

const PasswordInfo = ({ onChange }) => {
  const { password, repassword, valid } = useNewPasswordState();

  useEffect(() => {
    onChange({
      password: password.value,
      valid: valid
    });
  }, [password.value, repassword.value, valid]);

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <NewPassword
          value={password.value}
          onChange={password.update}
          required
          validate={password.validate}
          valid={valid}
        />
      </Grid>
      <Grid item xs={12}>
        <ConfirmPassword
          value={repassword.value}
          onChange={repassword.update}
          required
          validate={repassword.validate}
          valid={valid}
        />
      </Grid>
    </React.Fragment>
  );
};

PasswordInfo.propTypes = {
  onChange: PropTypes.func
};

export default PasswordInfo;
