<?php

namespace app\services;

use app\contracts\IEmailService1;
use app\domain\EmailTemplate;
use Aws\Ses\SesClient;
use vhs\services\Service;

class EmailService extends Service implements IEmailService1 {
    /**
     * @permission administrator
     *
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountTemplates($filters) {
        return EmailTemplate::count($filters);
    }

    /**
     * @permission administrator
     *
     * @param int $id
     *
     * @return void
     */
    public function DeleteTemplate($id) {
        /** @var \app\domain\EmailTemplate */
        $template = EmailTemplate::find($id);

        if (!is_null($template)) {
            $template->delete();
        }
    }

    /**
     * Email.
     *
     * @param mixed $email
     * @param mixed $tmpl
     * @param mixed $context
     * @param mixed $subject
     *
     * @return null
     */
    public function Email($email, $tmpl, $context, $subject = null) {
        $generated = EmailTemplate::generate($tmpl, $context);

        if (is_null($generated)) {
            throw new \Exception('Unable to load e-mail template');
        }

        if (is_null($subject)) {
            $subject = $generated->subject;
        }

        $client = new SesClient([
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
                        'Data' => $generated->txt
                    ],
                    'Html' => [
                        // Data is required
                        'Data' => $generated->html
                    ]
                ]
            ]
        ]);

        return null;
    }

    /**
     * EmailUser.
     *
     * @param mixed $user
     * @param mixed $tmpl
     * @param mixed $context
     * @param mixed $subject
     *
     * @return void
     */
    public function EmailUser($user, $tmpl, $context, $subject = null) {
        $this->Email($user->email, $tmpl, $context, $subject);
    }

    /**
     * @permission administrator
     *
     * @param int $id
     *
     * @return \app\domain\EmailTemplate
     */
    public function GetTemplate($id) {
        /** @var \app\domain\EmailTemplate */
        return EmailTemplate::find($id);
    }

    /**
     * @permission administrator
     *
     * @param int                            $page
     * @param int                            $size
     * @param string                         $columns
     * @param string                         $order
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return \app\domain\EmailTemplate[]
     */
    public function ListTemplates($page, $size, $columns, $order, $filters) {
        /** @var \app\domain\EmailTemplate[] */
        return EmailTemplate::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     *
     * @param string $name
     * @param string $code
     * @param string $subject
     * @param string $help
     * @param string $body
     * @param string $html
     *
     * @return void
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
     *
     * @param int    $id
     * @param string $body
     *
     * @return void
     */
    public function UpdateTemplateBody($id, $body) {
        /** @var \app\domain\EmailTemplate */
        $template = EmailTemplate::find($id);

        $template->body = $body;

        $template->save();
    }

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $code
     *
     * @return void
     */
    public function UpdateTemplateCode($id, $code) {
        /** @var \app\domain\EmailTemplate */
        $template = EmailTemplate::find($id);

        $template->code = $code;

        $template->save();
    }

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $help
     *
     * @return void
     */
    public function UpdateTemplateHelp($id, $help) {
        /** @var \app\domain\EmailTemplate */
        $template = EmailTemplate::find($id);

        $template->help = $help;

        $template->save();
    }

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $html
     *
     * @return void
     */
    public function UpdateTemplateHtml($id, $html) {
        /** @var \app\domain\EmailTemplate */
        $template = EmailTemplate::find($id);

        $template->html = $html;

        $template->save();
    }

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $name
     *
     * @return void
     */
    public function UpdateTemplateName($id, $name) {
        /** @var \app\domain\EmailTemplate */
        $template = EmailTemplate::find($id);

        $template->name = $name;

        $template->save();
    }

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $subject
     *
     * @return void
     */
    public function UpdateTemplateSubject($id, $subject) {
        /** @var \app\domain\EmailTemplate */
        $template = EmailTemplate::find($id);

        $template->subject = $subject;

        $template->save();
    }
}
