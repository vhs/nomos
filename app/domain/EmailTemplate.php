<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 5:05 PM
 */

namespace app\domain;

use app\schema\EmailSchema;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

class EmailTemplate extends Domain {
    public static function Define() {
        EmailTemplate::Schema(EmailSchema::Type());
    }

    public static function findByCode($code) {
        $val = EmailTemplate::where(Where::Equal(EmailSchema::Columns()->code, $code));

        if (!empty($val)) {
            return $val[0];
        }

        return null;
    }

    public static function generate($code, $context) {
        $template = self::findByCode($code);

        if (is_null($template)) {
            return null;
        }

        $engine = new \StringTemplate\Engine('{{', '}}');

        $ret = [];

        $ret['subject'] = $engine->render($template->subject, $context);
        $ret['txt'] = $engine->render($template->body, $context);
        $ret['html'] = $engine->render($template->html, $context);

        return $ret;
    }

    public function validate(ValidationResults &$results) {
        // not required at this time
    }
}
