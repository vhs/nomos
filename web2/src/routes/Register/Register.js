import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Paper, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { IdentityContext } from "../../providers/Identity";
import useRegistration from "./useRegistration";
import { Email, FirstName, LastName } from "../../components/fields";

const useStyles = makeStyles(theme => ({
  container: {},
  paper: {
    padding: theme.spacing(2)
  }
}));

const Register = () => {
  const classes = useStyles();

  const {
    identity,
    refreshIdentity,
    loading: identityLoading,
    error: identityError
  } = useContext(IdentityContext);

  console.log(identity);

  const {
    loading,
    fields: { email, firstname, lastname },
    error,
    valid,
    submit
  } = useRegistration({
    onSuccess: () => {
      refreshIdentity();
    }
  });

  const disabled = loading || identityLoading;

  if (identity) {
    return <Redirect to="/profile" />;
  }

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">New Member Registration</Typography>
          </Grid>
          <Grid item xs={12}>
            {error && (
              <Typography color="textSecondary">{error.message}</Typography>
            )}
            {identityError && (
              <Typography color="textSecondary">{identityError}</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Email
              value={email.value}
              onChange={email.setValue}
              required
              helperText={email.error}
              valid={email.valid}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={6}>
            <FirstName
              value={firstname.value}
              onChange={firstname.setValue}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={6}>
            <LastName
              value={lastname.value}
              onChange={lastname.setValue}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={submit}
              disabled={!valid || disabled}
            >
              {disabled ? "..." : "Register"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Register;
