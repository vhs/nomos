import { useState } from "react";

const useNewPasswordState = () => {
  const [password, $setPassword] = useState("");
  const [repassword, $setRePassword] = useState("");
  const [valid, setValid] = useState(false);

  const setPassword = value => {
    $setPassword(value.value);
    setValid(value.valid);
  };

  const setRePassword = value => {
    $setRePassword(value.value);
    setValid(value.valid);
  };

  const validatePassword = value => {
    return value === repassword;
  };

  const validateRePassword = value => {
    return value === password;
  };

  return {
    password: {
      value: password,
      validate: validatePassword,
      update: setPassword
    },
    repassword: {
      value: repassword,
      validate: validateRePassword,
      update: setRePassword
    },
    valid
  };
};

export default useNewPasswordState;
