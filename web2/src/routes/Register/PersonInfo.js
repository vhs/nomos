import React, { useState , useEffect } from 'react';

import { Email, FirstName, LastName } from '../../components/fields';

const PersonInfo = ({ onChange }) => {
  const [email, setEmail] = useState({ valid: true, value: '' });
  const [firstname, setFirstName] = useState({ valid: true, value: '' });
  const [lastname, setLastName] = useState({ valid: true, value: '' });

  useEffect(() => {
    onChange({
      email: email.value,
      firstname: firstname.value,
      lastname: lastname.value,
      valid: email.valid && firstname.valid && lastname.valid
    });
  }, [email, firstname, lastname]);

  return (
    <React.Fragment>
      <Email value={email.value} onChange={setEmail} required />
      <FirstName value={firstname.value} onChange={setFirstName} />
      <LastName value={lastname.value} onChange={setLastName} />
    </React.Fragment>
  );
};

export default PersonInfo;
