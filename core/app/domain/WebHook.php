<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 12:02 PM
 */

namespace app\domain;


use app\schema\WebHookPrivilegeSchema;
use app\schema\WebHookSchema;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

class WebHook extends Domain
{

    static function Define()
    {
        WebHook::Schema(WebHookSchema::Type());

        WebHook::Relationship("privileges", Privilege::Type(), WebHookPrivilegeSchema::Type());
        WebHook::Relationship("event", Event::Type());
    }

    /**
     * @param ValidationResults $results
     * @return bool
     */
    public function validate(ValidationResults &$results)
    {
        // TODO: Implement validate() method.
    }

    public static function findByDomainEvent($domain, $event)
    {
        return WebHook::where(Where::_And(
            Where::Equal(WebHook::Schema()->Columns()->domain, $domain),
            Where::Equal(WebHook::Schema()->Columns()->event, $event)
        ));
    }
}
