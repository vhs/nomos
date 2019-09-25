import React from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 80
  },
  cardContent: {
    minHeight: "200px"
  },
  joinCard: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  }
}));

const Welcome = ({ history }) => {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="lg">
      <Grid container>
        <Grid item xs={12}>
          <Typography>Welcome</Typography>
          <Typography>At VHS all members start with limited access privileges and can obtain 24/7 access by applying for keyholder status after their probationary period. This is to ensure trustworthiness and that a level of responsibility can be expected.  We like to get to know you before we give you keys to the place!</Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card className={clsx(classes.card, classes.joinCard)}>
            <CardHeader title="Become a Member!" />
            <CardContent className={classes.cardContent}>
              <Typography paragraph>2 months of probationary membership followed by a short vetting process on our forums, then full access to the space, 24/7</Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="secondary" onClick={() => history.push("/register")}>JOIN NOW</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={6} sm={4}>
          <Card>
            <CardHeader title="$10/month Friend of VHS" />
            <CardContent>
              <Typography variant="body2">If you don’t want to be a member, but you want to support us by kicking in a few bucks a month towards our space – we would LOVE your support!For less than the cost of a cup of coffee a week you can support innovation, learning, do-ocratic awesomeness in the greatest city on earth.</Typography>
            </CardContent>
            <CardActions>
              <Button>Donate Monthly</Button>
            </CardActions>
          </Card>
        </Grid>


        <Grid item xs={6} sm={4}>
          <Card>
            <CardHeader title="One-time donation to VHS" />
            <CardContent>
              <Typography variant="body2">Donations are warmly welcomed. Thank you!</Typography>
            </CardContent>
            <CardActions>
              <Button>Donate</Button>
            </CardActions>
          </Card>
        </Grid>

      </Grid>
    </Container>
  );
};

export default withRouter(Welcome);
