import React, { useState, useContext } from 'react';
import { IdentityContext } from '../Identity';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Typography} from "@material-ui/core";

const LoginForm = () => {
  const { login, error, isLoading } = useContext(IdentityContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <React.Fragment>
      <TextField autoComplete="username" autoFocus={true} placeholder="Username"
                 disabled={isLoading} value={username} onChange={e => setUsername(e.target.value)}
      />
      <TextField autoComplete="password" autoFocus={true} placeholder="Password" type="password"
                 disabled={isLoading} value={password} onChange={e => setPassword(e.target.value)}
                 onKeyPress={e => e.key === "Enter" && login(username, password)}
      />
      {error && <Typography color="red">{error}</Typography>}
      <Button color="primary" disabled={isLoading} onClick={() => login(username, password)}>Login</Button>
      <Button>Forgot Password</Button>
    </React.Fragment>
  );

};

export default LoginForm;
