<?php

/**
 * Created by PhpStorm.
 * User: thomas
 * Date: 25/02/16
 * Time: 5:46 PM.
 */

namespace app\contracts\v2;

use app\domain\EmailTemplate;
use vhs\services\IContract;

/** @typescript */
interface IEmailService2 extends IContract {
    /**
     * @permission administrator
     *
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountTemplates($filters): int;

    /**
     * @permission administrator
     *
     * @param int $id
     *
     * @return void
     */
    public function DeleteTemplate($id): void;

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
    public function Email($email, $tmpl, $context, $subject = null): void;

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
    public function EmailUser($user, $tmpl, $context, $subject = null): void;

    /**
     * @permission administrator
     *
     * @param int $id
     *
     * @return \app\domain\EmailTemplate|null
     */
    public function GetTemplate($id): EmailTemplate|null;

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
    public function ListTemplates($page, $size, $columns, $order, $filters): array;

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
    public function PutTemplate($name, $code, $subject, $help, $body, $html): bool;

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $body
     *
     * @return bool
     */
    public function UpdateTemplateBody($id, $body): bool;

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $code
     *
     * @return bool
     */
    public function UpdateTemplateCode($id, $code): bool;

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $help
     *
     * @return bool
     */
    public function UpdateTemplateHelp($id, $help): bool;

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $html
     *
     * @return bool
     */
    public function UpdateTemplateHtml($id, $html): bool;

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $name
     *
     * @return bool
     */
    public function UpdateTemplateName($id, $name): bool;

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $subject
     *
     * @return bool
     */
    public function UpdateTemplateSubject($id, $subject): bool;
}
