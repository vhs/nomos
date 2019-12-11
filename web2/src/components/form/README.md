`useForm`

`function useForm({ fields: Hash<string,any?>, validators: Hash<string,Validator>, onSubmit: function } : object) : Form`

`fields` - key value hash of initial form data
`validators` - key function hash of optional validators for a given field key.
  - gets called any time the associated field value is being updated
  - `function Validator(newValue: any?, currentValue: any?, state: Hash<string, Field>): string?, Hash<string,string?>`
  - return a string message and it will associate the error message and validity to the associated field
  - return a field key hash with error values to associate errors to any field, use null values to clear the error for a field not of your own

`onSubmit` - function(fields: Hash<string, Field>) - gets called on `Form.submit()` and receives latest form state

`Form` - object of
```
{
  fields: Hash<string, Field>,
  submit: function<void> : void,
  valid: bool
}
```

`Field` - object of
```
{
  value: any?,
  valid: bool,
  error: string?,
  setValue: function(value : FieldValue) : void,
  setError: function(value? : string) : void
}
```

`FieldValue` - object of
```
{
  value: any?,
  valid: bool
}
```


Example
```

const validateEmail = value => {
    if (!value.includes("@")) {
        return "not a valid email";
    }
};

const validateName = (newValue, currentValue, state) => {
    if (!state.email.value.startsWith(`${newValue}@`)) {
        return {
            email: `Must start with ${newValue}@`
        };
    }
    
    return { email: null };
};

const validatePassword = (value, _, state) => {
    if (value !== state.repassword.value) {
        return "Passwords do not match";
    }
};

const validateRePassword = (value, _, state) => {
    if (value !== state.password.value) {
        return {
            password: "Passwords do not match";
        };
    }

    return { password: null };
};

const validators = {
    email: validateEmail,
    name: validateName,
    password: validatePassword,
    repassword: validateRePassword
};

const onSubmit = (fields) => {
    const keyvalues = Object.keys(fields).reduce((kvp, field) => ({
        ...kvp,
        [field]: state[field].value
    }), {});
    
    console.log(keyvalues);

    fields.email.setError("email already taken");
};

const initialState = {
    email: "",
    name: "",
    password: "",
    repassword: ""
};

const MyForm = () => {
    const { fields: { email, name, password, repassword }, valid, submit } = useForm({
        fields: initialState,
        validators: validators,
        onSubmit: onSubmit
    });

    return (
        <TextField name="email" value={email.value} helperText={email.error} valid={email.valid} onChange={email.setValue} />
        <TextField name="name" value={name.value} helperText={name.error} valid={name.valid} onChange={name.setValue} />
        <TextField name="password" value={password.value} helperText={password.error} valid={password.valid} onChange={password.setValue} />
        <TextField name="repassword" value={repassword.value} helperText={repassword.error} valid={repassword.valid} onChange={repassword.setValue} />
        <Button onClick={submit} disabled={!valid}>Submit</Button>
    );
};

```