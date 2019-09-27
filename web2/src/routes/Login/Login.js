import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import LoginWidget from "./LoginWidget";

import { path as welcome } from '../Welcome';

const useStyles = makeStyles({
  card: {
    marginTop: 80
  },
  logo: {
    fontSize: "50pt",
    margin: 0,
    padding: 0,
    paddingLeft: "1ex",
    color: "rgba(0, 0, 0, 0.05)",
    fontWeight: "bold",
    letterSpacing: "1ex",
    position: "absolute",
    bottom: 0,
    right: 0,
    "&:hover": {
      color: "rgba(0, 0, 0, 0.1)",
      cursor: "pointer"
    }
  }
});

const Login = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Card className={classes.card}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Member Login
              </Typography>

              <Typography>
                Not yet a member? <RouterLink to={welcome}>Join here!</RouterLink>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <LoginWidget />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Link underline="none" href="https://github.com/vhs/nomos" target="_blank" className={classes.logo}>NOMOS</Link>
    </Container>
  );
};

export default Login;
