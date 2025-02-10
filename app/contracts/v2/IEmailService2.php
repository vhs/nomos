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
     * @param string $filters
     *
     * @throws string
     *
     * @return int
     */
    public function CountTemplates($filters): int;

    /**
     * @permission administrator
     *
     * @param int|int[] $id
     *
     * @throws string
     *
     * @return void
     */
    public function DeleteTemplate($id): void;

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
    public function Email($email, $tmpl, $context, $subject = null): void;

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
    public function EmailUser($user, $tmpl, $context, $subject = null): void;

    /**
     * @permission administrator
     *
     * @param int|int[] $id
     *
     * @throws string
     *
     * @return \app\domain\EmailTemplate
     */
    public function GetTemplate($id): EmailTemplate;

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
     * @throws string
     *
     * @return \app\domain\EmailTemplate
     */
    public function PutTemplate($name, $code, $subject, $help, $body, $html): EmailTemplate;

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
    public function UpdateTemplateBody($id, $body): bool;

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
    public function UpdateTemplateCode($id, $code): bool;

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
    public function UpdateTemplateHelp($id, $help): bool;

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
    public function UpdateTemplateHtml($id, $html): bool;

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
    public function UpdateTemplateName($id, $name): bool;

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
    public function UpdateTemplateSubject($id, $subject): bool;
}
