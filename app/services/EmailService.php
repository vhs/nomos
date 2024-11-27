<?php

namespace app\services;

use app\contracts\IEmailService1;
use app\domain\EmailTemplate;
use Aws\Ses\SesClient;

class EmailService implements IEmailService1 {
    public function EmailUser($user, $tmpl, $context, $subject = null) {
        $this->Email($user->email, $tmpl, $context, $subject);
    }

    public function Email($email, $tmpl, $context, $subject = null) {
        $generated = EmailTemplate::generate($tmpl, $context);

        if (is_null($generated)) {
            throw new \Exception('Unable to load e-mail template');
        }

        if (is_null($subject)) {
            $subject = $generated['subject'];
        }

        $client = SesClient::factory([
            'region' => AWS_SES_REGION,
            'credentials' => [
                'key' => AWS_SES_CLIENT_ID,
                'secret' => AWS_SES_SECRET
            ]
        ]);

        $client->sendEmail([
            'Source' => NOMOS_FROM_EMAIL,
            'Destination' => [
                'ToAddresses' => [$email]
            ],
            'Message' => [
                'Subject' => [
                    // Data is required
                    'Data' => $subject
                ],
                // Body is required
                'Body' => [
                    'Text' => [
                        // Data is required
                        'Data' => $generated['txt']
                    ],
                    'Html' => [
                        // Data is required
                        'Data' => $generated['html']
                    ]
                ]
            ]
        ]);

        return null;
    }

    /**
     * @permission administrator
     * @param $id
     * @return mixed
     */
    public function GetTemplate($id) {
        return EmailTemplate::find($id);
    }

    /**
     * @permission administrator
     * @param $id
     * @param $name
     * @return mixed
     */
    public function UpdateTemplateName($id, $name) {
        $template = EmailTemplate::find($id);
        $template->name = $name;
        $template->save();
    }

    /**
     * @permission administrator
     * @param $id
     * @param $code
     * @return mixed
     */
    public function UpdateTemplateCode($id, $code) {
        $template = EmailTemplate::find($id);
        $template->code = $code;
        $template->save();
    }

    /**
     * @permission administrator
     * @param $id
     * @param $subject
     * @return mixed
     */
    public function UpdateTemplateSubject($id, $subject) {
        $template = EmailTemplate::find($id);
        $template->subject = $subject;
        $template->save();
    }

    /**
     * @permission administrator
     * @param $id
     * @param $help
     * @return mixed
     */
    public function UpdateTemplateHelp($id, $help) {
        $template = EmailTemplate::find($id);
        $template->help = $help;
        $template->save();
    }

    /**
     * @permission administrator
     * @param $id
     * @param $body
     * @return mixed
     */
    public function UpdateTemplateBody($id, $body) {
        $template = EmailTemplate::find($id);
        $template->body = $body;
        $template->save();
    }

    /**
     * @permission administrator
     * @param $id
     * @param $html
     * @return mixed
     */
    public function UpdateTemplateHtml($id, $html) {
        $template = EmailTemplate::find($id);
        $template->html = $html;
        $template->save();
    }

    /**
     * @permission administrator
     * @param $name
     * @param $code
     * @param $subject
     * @param $help
     * @param $body
     * @param $html
     * @return mixed
     */
    public function PutTemplate($name, $code, $subject, $help, $body, $html) {
        $template = EmailTemplate::findByCode($code);

        if (is_null($template)) {
            $template = new EmailTemplate();
        }

        $template->name = $name;
        $template->code = $code;
        $template->subject = $subject;
        $template->help = $help;
        $template->body = $body;
        $template->html = $html;

        $template->save();
    }

    /**
     * @permission administrator
     * @param $id
     * @return mixed
     */
    public function DeleteTemplate($id) {
        $template = EmailTemplate::find($id);

        if (!is_null($template)) {
            $template->delete();
        }
    }

    /**
     * @permission administrator
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     * @return mixed
     */
    public function ListTemplates($page, $size, $columns, $order, $filters) {
        return EmailTemplate::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     * @param $filters
     * @return int
     */
    public function CountTemplates($filters) {
        return EmailTemplate::count($filters);
    }
}
