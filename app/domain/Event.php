<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 10:49 AM
 */

namespace app\domain;


use app\schema\EventPrivilegeSchema;
use app\schema\EventSchema;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

class Event extends Domain
{

    static function Define()
    {
        Event::Schema(EventSchema::Type());

        Event::Relationship("privileges", Privilege::Type(), EventPrivilegeSchema::Type());
    }

    /**
     * @param ValidationResults $results
     * @return bool
     */
    public function validate(ValidationResults &$results)
    {
        // TODO: Implement validate() method.
    }

    public static function exists($domain, $event) {
        $events = Event::where(
            Where::_And(
                Where::Equal(Event::Schema()->Columns()->domain, $domain),
                Where::Equal(Event::Schema()->Columns()->event, $event)
            )
        );

        return count($events) > 0;
    }
}