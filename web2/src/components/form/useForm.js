import { useCallback, useState, useMemo } from "react";

const useForm = ({ fields = {}, validators = {}, onSubmit }) => {
  const fieldNames = Object.keys(fields);

  const initialState = fieldNames.reduce(
    (state, field) => ({
      ...state,
      [field]: {
        value: fields[field],
        valid: true,
        error: null
      }
    }),
    {}
  );

  const [state, setState] = useState(initialState);

  const makeFieldUpdater = field =>
    useCallback(
      ({ value, valid }) => {
        let errors = {};

        const result = validators[field]
          ? validators[field](value, state[field].value, state)
          : {};

        if (typeof result === "string") {
          errors[field] = result;
        } else {
          errors = result || {};
        }

        const newState = Object.keys(state).reduce(
          (acc, key) => ({
            ...acc,
            [key]: {
              ...state[key],
              value: key === field ? value : state[key].value,
              valid: Object.keys(errors).includes(key)
                ? errors[key] === null
                : key === field
                ? valid
                : state[key].valid,
              error: errors[key] ? errors[key] : null
            }
          }),
          {}
        );

        setState(newState);
      },
      [state, setState]
    );

  const makeErrorUpdater = field =>
    useCallback(
      value => {
        const error = value === undefined || value === "" ? null : value;

        const newState = Object.keys(state).reduce(
          (acc, key) => ({
            ...acc,
            [key]: {
              ...state[key],
              error: field === key ? error : state[key].error,
              valid: field === key ? !error : state[key].valid
            }
          }),
          {}
        );

        setState(newState);
      },
      [state, setState]
    );

  const $fields = Object.keys(state).reduce(
    (acc, field) => ({
      ...acc,
      [field]: {
        ...state[field],
        setValue: makeFieldUpdater(field),
        setError: makeErrorUpdater(field)
      }
    }),
    {}
  );

  const valid = useMemo(
    () => Object.values(state).every(({ valid }) => valid),
    [state]
  );

  const submit = useCallback(() => {
    onSubmit($fields);
  }, [$fields, state, onSubmit]);

  return {
    fields: $fields,
    submit: submit,
    valid: valid
  };
};

export default useForm;
