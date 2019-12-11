import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Paper, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import useCreatePassword from "./useCreatePassword";
import { ConfirmPassword, NewPassword } from "../../components/fields/password";

const useStyles = makeStyles(theme => ({
  container: {},
  paper: {
    padding: theme.spacing(2)
  }
}));

const CreatePassword = () => {
  const classes = useStyles();

  const {
    loading,
    fields: { token, password, repassword },
    error,
    valid,
    submit
  } = useCreatePassword();

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Create New Password</Typography>
          </Grid>
          <Grid item xs={12}>
            {error && (
              <Typography color="textSecondary">{error.message}</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <NewPassword
              value={password.value}
              onChange={password.setValue}
              required
              helperText={password.error}
              valid={password.valid}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <ConfirmPassword
              value={repassword.value}
              onChange={repassword.setValue}
              required
              helperText={repassword.error}
              valid={repassword.valid}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={submit}
              disabled={!valid || loading}
            >
              {loading ? "..." : "Create Password"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CreatePassword;
