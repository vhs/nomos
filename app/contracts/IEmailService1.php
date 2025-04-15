<?php

/**
 * Created by PhpStorm.
 * User: thomas
 * Date: 25/02/16
 * Time: 5:46 PM.
 */

namespace app\contracts;

use vhs\services\IContract;

/** @typescript */
interface IEmailService1 extends IContract {
    /**
     * @permission administrator
     *
     * @param string $filters
     *
     * @return int
     */
    public function CountTemplates($filters);

    /**
     * @permission administrator
     *
     * @param int $id
     *
     * @return mixed
     */
    public function DeleteTemplate($id);

    /**
     * Email.
     *
     * @permission authenticated
     *
     * @param mixed $email
     * @param mixed $tmpl
     * @param mixed $context
     * @param mixed $subject
     *
     * @return mixed
     */
    public function Email($email, $tmpl, $context, $subject = null);

    /**
     * EmailUser.
     *
     * @permission authenticated
     *
     * @param mixed $user
     * @param mixed $tmpl
     * @param mixed $context
     * @param mixed $subject
     *
     * @return mixed
     */
    public function EmailUser($user, $tmpl, $context, $subject = null);

    /**
     * @permission administrator
     *
     * @param int $id
     *
     * @return mixed
     */
    public function GetTemplate($id);

    /**
     * @permission administrator
     *
     * @param int    $page
     * @param int    $size
     * @param string $columns
     * @param string $order
     * @param string $filters
     *
     * @return mixed
     */
    public function ListTemplates($page, $size, $columns, $order, $filters);

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
     * @return mixed
     */
    public function PutTemplate($name, $code, $subject, $help, $body, $html);

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $body
     *
     * @return mixed
     */
    public function UpdateTemplateBody($id, $body);

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $code
     *
     * @return mixed
     */
    public function UpdateTemplateCode($id, $code);

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $help
     *
     * @return mixed
     */
    public function UpdateTemplateHelp($id, $help);

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $html
     *
     * @return mixed
     */
    public function UpdateTemplateHtml($id, $html);

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $name
     *
     * @return mixed
     */
    public function UpdateTemplateName($id, $name);

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $subject
     *
     * @return mixed
     */
    public function UpdateTemplateSubject($id, $subject);
}
