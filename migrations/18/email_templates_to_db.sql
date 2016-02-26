ALTER TABLE `email_templates` ADD COLUMN `code` VARCHAR(255) NOT NULL DEFAULT '!!invalid_code!!';
ALTER TABLE `email_templates` ADD COLUMN `html` TEXT NULL;

INSERT INTO `email_templates` (`name`, `code`, `subject`, `body`, `html`) VALUES (
  'admin_donation_random',
  'admin_donation_random',
  '[Nomos] New Random donation! - {{fname}} {{lname}}',
  'Random donation by {{fname}} {{lname}} {{email}}

of {{currency}}{{rate_amount}} was received!

item_number: {{item_number}}
item_name: {{item_name}}

If the item_name isn''t blank or something expected to be a donation that means the item_number above is probably blank or not configured to a membership type or a purchase we have.

Thank you,
- Vancouver Hackspace Society
',
  'Random donation by {{fname}} {{lname}} {{email}}
<br/><br/>
of {{currency}}{{rate_amount}} was received!
<br/><br/>
item_number: {{item_number}}<br/>
item_name: {{item_name}}<br/>
<br/><br/>
If the item_name isn''t blank or something expected to be a donation that means the item_number above is probably blank or not configured to a membership type or a purchase we have.
<br/><br/>
Thank you,<br/>
- Vancouver Hackspace Society<br/>
'
);

INSERT INTO `email_templates` (`name`, `code`, `subject`, `body`, `html`) VALUES (
  'admin_error',
  'admin_error',
  '{{subject}}',
  '{{message}}',
  '{{message}}'
);

INSERT INTO `email_templates` (`name`, `code`, `subject`, `body`, `html`) VALUES (
  'admin_membercard_purchased',
  'admin_membercard_purchased',
  '[Nomos] New Membership Card Purchase! - {{fname}} {{lname}}',
  'Membership card has been purchased!

Member: {{fname}} {{lname}} {{email}}

A director needs to arrange a time with this member to be at the space and issue them a card.

The process to issue a card:

Download the Android VHS Mobile app:

If registered genuine member cards remain, register a new card as a genuine member card first.

1. In the app, select "Register Genuine Member Card"
2. Scan a new member card from the admin cabinet
3. Await confirmation that the card is registered

Select a registered genuine member card:

1. In the app, select "Issue Member Card"
2. Enter the member''s email address
3. Scan the genuine member card
4. Await confirmation that the card has been successfully issued!
5. Give the card to the member

Thank you,
- Vancouver Hackspace Society
',
  'Membership card has been purchased!<br/>
<br/>
Member: {{fname}} {{lname}} {{email}}<br/>
<br/>
A director needs to arrange a time with this member to be at the space and issue them a card.<br/>
<br/>
The process to issue a card:<br/>
<br/>
Download the Android VHS Mobile app:<br/>
<br/>
If registered genuine member cards remain, register a new card as a genuine member card first.<br/>
<br/>
1. In the app, select "Register Genuine Member Card"<br/>
2. Scan a new member card from the admin cabinet<br/>
3. Await confirmation that the card is registered<br/>
<br/>
Select a registered genuine member card:<br/>
<br/>
1. In the app, select "Issue Member Card"<br/>
2. Enter the member''s email address<br/>
3. Scan the genuine member card<br/>
4. Await confirmation that the card has been successfully issued!<br/>
5. Give the card to the member<br/>
<br/>
Thank you,<br />
- Vancouver Hackspace Society<br/>
'
);

INSERT INTO `email_templates` (`name`, `code`, `subject`, `body`, `html`) VALUES (
  'admin_newuser',
  'admin_newuser',
  '[Nomos] New User Created!',
  'New user added!

{{fname}} {{lname}}
Email: {{email}}

{{host}}/#/users/{{id}}

',
  'New user added!
<br /><br />
{{fname}} {{lname}}
<br />
Email: {{email}}
<br />
<br />
<a href="{{host}}/#/users/{{id}}">Edit user profile</a>'
);

INSERT INTO `email_templates` (`name`, `code`, `subject`, `body`, `html`) VALUES (
  'admin_payment',
  'admin_payment',
  '[Nomos] User payment made!',
  '{{fname}} {{lname}}, {{email}}, made payment of {{amount}} via {{pp}}.',
  '{{fname}} {{lname}}, {{email}}, made payment of {{amount}} via {{pp}}.'
);

INSERT INTO `email_templates` (`name`, `code`, `subject`, `body`, `html`) VALUES (
  'donation_random',
  'donation_random',
  'VHS Donation!',
  'Dear {{fname}} {{lname}},

Your donation of {{currency}}{{rate_amount}} was received!

Thank you,
- Vancouver Hackspace Society
',
  'Dear {{fname}} {{lname}},
<br /><br />
Your donation of {{currency}}{{rate_amount}} was received!
<br /><br />
Thank you,<br />
- Vancouver Hackspace Society
<br />
'
);

INSERT INTO `email_templates` (`name`, `code`, `subject`, `body`, `html`) VALUES (
  'membercard_purchased',
  'membercard_purchased',
  'VHS Membership Card Purchased!',
  'Hey {{fname}} {{lname}},

Thanks for purchasing a VHS Membership card!

Currently, member cards can only be picked up in person. You''ll need to arrange for a time to be down at the space with a director and they can issue you your card!

The directors have been notified of your purchase and will be in touch as soon as they can!

Thank you,
- Vancouver Hackspace Society

http://membership.hackspace.ca
',
  'Hey {{fname}} {{lname}},
<br />
<p>Thanks for purchasing a VHS Membership card!</p>
<p>Currently, member cards can only be picked up in person. You''ll need to arrange for a time to be down at the space with a director and they can issue you your card!</p>
<p>The directors have been notified of your purchase and will be in touch as soon as they can!</p>
</br>
Thank you,
<br />
- Vancouver Hackspace Society
<br/>
<br/>
<a href="http://membership.hackspace.ca">http://membership.hackspace.ca</a>
'
);

INSERT INTO `email_templates` (`name`, `code`, `subject`, `body`, `html`) VALUES (
  'payment',
  'payment',
  'VHS Membership Payment Received!',
  'Dear {{fname}},

Thank you for your payment!

- Vancouver Hackspace Society

{{host}}
',
  'Dear {{fname}},
<br />
Thank you for your payment!
<br />
- Vancouver Hackspace Society
<br />
<a href="{{host}}">{{host}}</a>
<br />'
);

INSERT INTO `email_templates` (`name`, `code`, `subject`, `body`, `html`) VALUES (
  'recover',
  'recover',
  'Nomos Password Recovery',
  'Password Recovery

Click here to reset your password: {{host}}index.html#/recovery/reset/{{token}}

If the above link is not clickable, try copying and pasting it into the address bar of your web browser.
',
  'Password Recovery<br>
<br>
<a href="{{host}}index.html#/recovery/reset/{{token}}">Click here to reset your password</a><br>
<br>
If the above link is not clickable, try copying the following link and pasting it into the address bar of your web browser:<br>
<br>
{{host}}index.html#/recovery/reset/{{token}}
'
);

INSERT INTO `email_templates` (`name`, `code`, `subject`, `body`, `html`) VALUES (
  'welcome',
  'welcome',
  'VHS Nomos Account Activation',
  'Click here to reset your password: {{host}}index.html#/recovery/reset/{{token}}

If the above link is not clickable, try copying and pasting it into the address bar of your web browser.',
  '<br>
<a href="{{host}}index.html#/recovery/reset/{{token}}">Click here to reset your password</a><br>
<br>
If the above link is not clickable, try copying the following link and pasting it into the address bar of your web browser:<br>
<br>
{{host}}index.html#/recovery/reset/{{token}}'
);
