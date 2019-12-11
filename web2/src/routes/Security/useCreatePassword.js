/*
after registration, a user will not have a password and can only use the emailed activation token to login/set a password


 */


import {useCallback, useState} from "react";
import {useForm} from "../../components/form";

const messages = {
  passwordsDontMatch: "Passwords do not match"
};

const validatePassword = (newValue, prevValue, state) => {
  if (newValue !== state.repassword.value) {
    return {
      password: messages.passwordsDontMatch
    };
  }
};

const validateRePassword = (newValue, prevValue, state) => {
  if (newValue !== state.password.value) {
    return {
      password: messages.passwordsDontMatch
    };
  }

  return { password: null };
};

const validators = {
  password: validatePassword,
  repassword: validateRePassword
};

const postCreatePassword = async ({ token, password, repassword }) => {
  const resp = await fetch("/services/web/UserService1.svc/CreatePassword?", {
    method: "POST",
    body: JSON.stringify({
      token: token,
      password: password,
      repassword: repassword
    })
  });

  const data = await resp.json();

  return {
    status: resp.status,
    data: data
  };
};

const useCreatePassword = () => {
  const initialState = {
    token: "",
    password: "",
    repassword: ""
  };

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const createPassword = useCallback(
    state => {
      setLoading(true);

      console.log(state);

      postCreatePassword({
        token: state.token.value,
        password: state.password.value,
        repassword: state.repassword.value
      }).then(({ status, data }) => {
        console.log(data);
        setLoading(false);
        if (status !== 200) {
          if (data.type === "app\\contracts\\UserExistsException") {
            state.email.setError(messages.emailAlreadyRegistered);
          } else {
            setError(data);
          }
        }
      });
    },
    [setLoading]
  );

  const handleSubmit = useCallback(
    state => {
      createPassword(state);
    },
    [createPassword]
  );

  const { fields, valid, submit } = useForm({
    fields: initialState,
    validators: validators,
    onSubmit: handleSubmit
  });

  return {
    fields,
    valid,
    error,
    loading,
    submit
  };
};

export default useCreatePassword;
