import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  container: {
    marginTop: 80
  }
});

const Welcome = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="sm">
      <Typography>Welcome</Typography>
    </Container>
  );
};

export default Welcome;
