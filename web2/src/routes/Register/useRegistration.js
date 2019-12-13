import { useState, useCallback } from "react";
import { useForm } from "../../components/form";

const messages = {
  emailAlreadyRegistered: "E-mail is already registered."
};

const validators = {
  email: value => {
    //TODO regex validate email
  }
};

const postRegister = async ({ username, email, fname, lname }) => {
  const resp = await fetch("/services/web/UserService1.svc/Register", {
    method: "POST",
    body: JSON.stringify({
      username: username,
      email: email,
      fname: fname,
      lname: lname
    })
  });

  const data = await resp.json();

  return {
    status: resp.status,
    data: data
  };
};

const useRegistration = ({ onSuccess }) => {
  const initialState = {
    email: "",
    firstname: "",
    lastname: ""
  };

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const register = useCallback(
    state => {
      setLoading(true);

      console.log(state);

      postRegister({
        username: state.email.value,
        email: state.email.value,
        fname: state.firstname.value,
        lname: state.lastname.value
      }).then(({ status, data }) => {
        console.log(data);

        if (status !== 200) {
          if (data.type === "app\\contracts\\UserExistsException") {
            state.email.setError(messages.emailAlreadyRegistered);
          } else {
            setError(data);
          }
        } else {
          onSuccess(data);
        }

        setLoading(false);
      });
    },
    [setLoading]
  );

  const handleSubmit = useCallback(
    state => {
      register(state);
    },
    [register]
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

export default useRegistration;
