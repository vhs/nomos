INSERT INTO `email_templates` (`name`, `code`, `subject`, `body`, `html`) VALUES (
  'registration',
  'registration',
  'Welcome to VHS! Nomos Account Activation',
  'Welcome {{fname}} {{lname}} to VHS!

  Click here to activate your account: {{host}}activate/{{token}}

If the above link is not clickable, try copying and pasting it into the address bar of your web browser.',
  '<br>
  Welcome {{fname}} {{lname}} to VHS!
  <br>
<a href="{{host}}activate/{{token}}">Click here to activate your account</a><br>
<br>
If the above link is not clickable, try copying the following link and pasting it into the address bar of your web browser:<br>
<br>
{{host}}activate/{{token}}'
);
