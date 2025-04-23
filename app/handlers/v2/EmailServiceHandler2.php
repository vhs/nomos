<?php

namespace app\handlers\v2;

use app\adapters\v2\EmailAdapter2;
use app\contracts\v2\IEmailService2;
use app\domain\EmailTemplate;
use vhs\exceptions\HttpException;
use vhs\services\Service;
use vhs\web\enums\HttpStatusCodes;

/** @typescript */
class EmailServiceHandler2 extends Service implements IEmailService2 {
    /**
     * @permission administrator
     *
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountTemplates($filters): int {
        return EmailTemplate::count($filters);
    }

    /**
     * @permission administrator
     *
     * @param int $id
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return void
     */
    public function DeleteTemplate($id): void {
        $template = EmailTemplate::find($id);

        if (is_null($template)) {
            throw new HttpException('EmailTemplate not found', HttpStatusCodes::Client_Error_Not_Found);
        }

        $template->delete();
    }

    /**
     * Summary of Email.
     *
     * @permission administrator
     *
     * @param string              $email
     * @param string              $tmpl
     * @param array<string,mixed> $context
     * @param string|null         $subject
     *
     * @return void
     */
    public function Email($email, $tmpl, $context, $subject = null): void {
        EmailAdapter2::getInstance()->Email($email, $tmpl, $context, $subject);
    }

    /**
     * Summary of EmailUser.
     *
     * @permission administrator
     *
     * @param \app\domain\User    $user    email address
     * @param string              $tmpl
     * @param array<string,mixed> $context
     * @param string|null         $subject
     *
     * @return void
     */
    public function EmailUser($user, $tmpl, $context, $subject = null): void {
        EmailAdapter2::getInstance()->EmailUser($user, $tmpl, $context, $subject);
    }

    /**
     * @permission administrator
     *
     * @param int $id
     *
     * @return \app\domain\EmailTemplate|null
     */
    public function GetTemplate($id): EmailTemplate|null {
        /** @var \app\domain\EmailTemplate|null */
        return EmailTemplate::find($id);
    }

    /**
     * @permission administrator
     *
     * @param int                     $page
     * @param int                     $size
     * @param string                  $columns
     * @param string                  $order
     * @param \vhs\domain\Filter|null $filters
     *
     * @return \app\domain\EmailTemplate[]
     */
    public function ListTemplates($page, $size, $columns, $order, $filters): array {
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
     * @return bool
     */
    public function PutTemplate($name, $code, $subject, $help, $body, $html): bool {
        /** @var EmailTemplate|null */
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
     * @param int    $id
     * @param string $name
     * @param string $code
     * @param string $subject
     * @param string $help
     * @param string $body
     * @param string $html
     *
     * @return bool
     */
    public function UpdateTemplate($id, $name, $code, $subject, $help, $body, $html): bool {
        /** @var EmailTemplate|null */
        $template = EmailTemplate::find($id);

        if (is_null($template)) {
            throw new HttpException('Invalid or missing template id.', HttpStatusCodes::Client_Error_Not_Found);
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
     * @param int    $id
     * @param string $body
     *
     * @return bool
     */
    public function UpdateTemplateBody($id, $body): bool {
        /** @var \app\domain\EmailTemplate */
        $template = EmailTemplate::find($id);

        $template->body = $body;

        return $template->save();
    }

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $code
     *
     * @return bool
     */
    public function UpdateTemplateCode($id, $code): bool {
        /** @var \app\domain\EmailTemplate */
        $template = EmailTemplate::find($id);

        $template->code = $code;

        return $template->save();
    }

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $help
     *
     * @return bool
     */
    public function UpdateTemplateHelp($id, $help): bool {
        /** @var \app\domain\EmailTemplate */
        $template = EmailTemplate::find($id);

        $template->help = $help;

        return $template->save();
    }

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $html
     *
     * @return bool
     */
    public function UpdateTemplateHtml($id, $html): bool {
        /** @var \app\domain\EmailTemplate */
        $template = EmailTemplate::find($id);

        $template->html = $html;

        return $template->save();
    }

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $name
     *
     * @return bool
     */
    public function UpdateTemplateName($id, $name): bool {
        /** @var \app\domain\EmailTemplate */
        $template = EmailTemplate::find($id);

        $template->name = $name;

        return $template->save();
    }

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $subject
     *
     * @return bool
     */
    public function UpdateTemplateSubject($id, $subject): bool {
        /** @var \app\domain\EmailTemplate */
        $template = EmailTemplate::find($id);

        $template->subject = $subject;

        return $template->save();
    }
}
