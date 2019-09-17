import React, { useContext } from 'react';

import { IdentityContext } from "../Identity";
import { UserCard } from '../UserCard';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardActions';
import Button from "@material-ui/core/Button";
import LoginForm from './LoginForm';

const LoginWidget = () => {
  const { identity, logout } = useContext(IdentityContext);

  if (identity) {
    return (<UserCard user={identity}>
      <CardContent>
        Currently logged in
      </CardContent>
      <CardActions>
        <Button color="primary">Goto profile</Button>
        <Button color="primary" onClick={logout}>Logout</Button>
      </CardActions>
    </UserCard>);
  }

  return (<LoginForm />);
};

export default LoginWidget;
