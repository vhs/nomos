import React, { useState, useEffect } from 'react';

import { Username, NewPassword, ConfirmPassword } from '../../components/fields';

const UserInfo = ({ onChange }) => {
  const [username, setUsername] = useState({ valid: true, value: "" });

  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const $setPassword = value => {
    setPassword(value.value);
    setValidPassword(value.valid);
  };

  const $setRePassword = value => {
    setRePassword(value.value);
    setValidPassword(value.valid);
  };

  const validatePassword = value => {
    return value === repassword;
  };

  const validateRePassword = value => {
    return value === password;
  };

  useEffect(() => {
    onChange({
      username: username.value,
      password: password,
      valid: username.valid && validPassword
    })
  }, [username, password, repassword, validPassword]);

  return (
    <React.Fragment>
      <Username value={username.value} onChange={setUsername} required />
      <NewPassword value={password} onChange={$setPassword} required validate={validatePassword} valid={validPassword} />
      <ConfirmPassword value={repassword} onChange={$setRePassword} required validate={validateRePassword} valid={validPassword} />
    </React.Fragment>
  );
};

export default UserInfo;
