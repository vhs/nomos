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
     * @param $filters
     *
     * @return int
     */
    public function CountTemplates($filters);

    /**
     * @permission administrator
     *
     * @param $id
     *
     * @return mixed
     */
    public function DeleteTemplate($id);

    public function Email($email, $tmpl, $context, $subject = null);

    public function EmailUser($user, $tmpl, $context, $subject = null);

    /**
     * @permission administrator
     *
     * @param $id
     *
     * @return mixed
     */
    public function GetTemplate($id);

    /**
     * @permission administrator
     *
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     *
     * @return mixed
     */
    public function ListTemplates($page, $size, $columns, $order, $filters);

    /**
     * @permission administrator
     *
     * @param $name
     * @param $code
     * @param $subject
     * @param $help
     * @param $body
     * @param $html
     *
     * @return mixed
     */
    public function PutTemplate($name, $code, $subject, $help, $body, $html);

    /**
     * @permission administrator
     *
     * @param $id
     * @param $body
     *
     * @return mixed
     */
    public function UpdateTemplateBody($id, $body);

    /**
     * @permission administrator
     *
     * @param $id
     * @param $code
     *
     * @return mixed
     */
    public function UpdateTemplateCode($id, $code);

    /**
     * @permission administrator
     *
     * @param $id
     * @param $help
     *
     * @return mixed
     */
    public function UpdateTemplateHelp($id, $help);

    /**
     * @permission administrator
     *
     * @param $id
     * @param $html
     *
     * @return mixed
     */
    public function UpdateTemplateHtml($id, $html);

    /**
     * @permission administrator
     *
     * @param $id
     * @param $name
     *
     * @return mixed
     */
    public function UpdateTemplateName($id, $name);

    /**
     * @permission administrator
     *
     * @param $id
     * @param $subject
     *
     * @return mixed
     */
    public function UpdateTemplateSubject($id, $subject);
}
