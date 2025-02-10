<?php

namespace app\handlers\v2;

use app\contracts\v2\IEmailService2;
use app\domain\EmailTemplate;
use app\exceptions\InvalidInputException;
use Aws\Ses\SesClient;
use vhs\domain\exceptions\DomainException;
use vhs\services\Service;

/** @typescript */
class EmailServiceHandler2 extends Service implements IEmailService2 {
    /**
     * @permission administrator
     *
     * @param string $filters
     *
     * @throws string
     *
     * @return int
     */
    public function CountTemplates($filters): int {
        return EmailTemplate::count($filters);
    }

    /**
     * @permission administrator
     *
     * @param int|int[] $id
     *
     * @throws string
     *
     * @return void
     */
    public function DeleteTemplate($id): void {
        $template = EmailTemplate::find($id);

        if (is_null($template)) {
            throw new DomainException('EmailTemplate not found', 404);
        }

        $template->delete();
    }

    /**
     * Summary of Email.
     *
     * @permission administrator
     *
     * @param string               $email
     * @param string               $tmpl
     * @param array<string, mixed> $context
     * @param string|null          $subject
     *
     * @throws string
     *
     * @return void
     */
    public function Email($email, $tmpl, $context, $subject = null): void {
        $generated = EmailTemplate::generate($tmpl, $context);

        if (is_null($generated)) {
            throw new InvalidInputException('Unable to load e-mail template');
        }

        if (is_null($subject)) {
            $subject = $generated['subject'];
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
                        'Data' => $generated['txt']
                    ],
                    'Html' => [
                        // Data is required
                        'Data' => $generated['html']
                    ]
                ]
            ]
        ]);
    }

    /**
     * Summary of EmailUser.
     *
     * @permission administrator
     *
     * @param \app\domain\User     $user    email address
     * @param string               $tmpl
     * @param array<string, mixed> $context
     * @param string|null          $subject
     *
     * @throws string
     *
     * @return void
     */
    public function EmailUser($user, $tmpl, $context, $subject = null): void {
        $this->Email($user->email, $tmpl, $context, $subject);
    }

    /**
     * @permission administrator
     *
     * @param int|int[] $id
     *
     * @throws string
     *
     * @return \app\domain\EmailTemplate
     */
    public function GetTemplate($id): EmailTemplate {
        return EmailTemplate::find($id);
    }

    /**
     * @permission administrator
     *
     * @param int    $page
     * @param int    $size
     * @param string $columns
     * @param string $order
     * @param string $filters
     *
     * @throws string
     *
     * @return \app\domain\EmailTemplate[]
     */
    public function ListTemplates($page, $size, $columns, $order, $filters): array {
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
     * @throws string
     *
     * @return \app\domain\EmailTemplate
     */
    public function PutTemplate($name, $code, $subject, $help, $body, $html): EmailTemplate {
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

        return $template->save();
    }

    /**
     * @permission administrator
     *
     * @param int|int[] $id
     * @param string    $body
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdateTemplateBody($id, $body): bool {
        $template = EmailTemplate::find($id);

        $template->body = $body;

        return $template->save();
    }

    /**
     * @permission administrator
     *
     * @param int|int[] $id
     * @param string    $code
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdateTemplateCode($id, $code): bool {
        $template = EmailTemplate::find($id);

        $template->code = $code;

        return $template->save();
    }

    /**
     * @permission administrator
     *
     * @param int|int[] $id
     * @param string    $help
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdateTemplateHelp($id, $help): bool {
        $template = EmailTemplate::find($id);

        $template->help = $help;

        return $template->save();
    }

    /**
     * @permission administrator
     *
     * @param int|int[] $id
     * @param string    $html
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdateTemplateHtml($id, $html): bool {
        $template = EmailTemplate::find($id);

        $template->html = $html;

        return $template->save();
    }

    /**
     * @permission administrator
     *
     * @param int|int[] $id
     * @param string    $name
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdateTemplateName($id, $name): bool {
        $template = EmailTemplate::find($id);

        $template->name = $name;

        return $template->save();
    }

    /**
     * @permission administrator
     *
     * @param int|int[] $id
     * @param string    $subject
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdateTemplateSubject($id, $subject): bool {
        $template = EmailTemplate::find($id);

        $template->subject = $subject;

        return $template->save();
    }
}
