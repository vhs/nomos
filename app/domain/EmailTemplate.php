<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 5:05 PM.
 */

namespace app\domain;

use app\dto\GeneratedEmailResults;
use app\schema\EmailSchema;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

/**
 * @property int    $id
 * @property string $name
 * @property string $code
 * @property string $subject
 * @property string $help
 * @property string $body
 * @property string $html
 *
 * @typescript
 */
class EmailTemplate extends Domain {
    public static function Define() {
        EmailTemplate::Schema(EmailSchema::Type());
    }

    /**
     * findByCode.
     *
     * @param string $code
     *
     * @return EmailTemplate|null
     */
    public static function findByCode($code) {
        // TODO implement proper typing
        // @phpstan-ignore property.notFound
        $val = EmailTemplate::where(Where::Equal(EmailSchema::Columns()->code, $code));

        if (!empty($val)) {
            return $val[0];
        }

        return null;
    }

    /**
     * generate.
     *
     * @param string               $code
     * @param array<string>|string $context
     *
     * @return \app\dto\GeneratedEmailResults|null
     */
    public static function generate($code, $context) {
        $template = self::findByCode($code);

        if (is_null($template)) {
            return null;
        }

        $engine = new \StringTemplate\Engine('{{', '}}');

        $ret = new GeneratedEmailResults();

        $ret->subject = $engine->render($template->subject, $context);
        $ret->txt = $engine->render($template->body, $context);
        $ret->html = $engine->render($template->html, $context);

        return $ret;
    }

    public function validate(ValidationResults &$results) {
        // TODO: Implement validate() method.
    }
}
