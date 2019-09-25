import { useState, useEffect } from 'react';

const useFieldState = ({ value, validate, required, onChange }) => {
  const [$value, setValue] = useState(value);
  const [valid, setValid] = useState(true);

  const $setValue = e => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (required && ($value === undefined || $value === null || $value === "")) {
      return setValid(false);
    }

    setValid(validate($value));
  }, [$value]);

  useEffect(() => {
    if (!onChange) return;

    onChange({
      value: $value,
      valid
    });
  }, [$value, valid]);

  return [
    $value,
    valid,
    $setValue
  ];
};

export default useFieldState;
