<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 12:02 PM.
 */

namespace app\domain;

use app\schema\WebHookPrivilegeSchema;
use app\schema\WebHookSchema;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

/**
 * @property int               $id
 * @property string            $name
 * @property string            $description
 * @property bool              $enabled
 * @property int               $userid
 * @property string            $url
 * @property string            $translation
 * @property string            $headers
 * @property string            $method
 * @property int               $eventid
 * @property \app\domain\Event $event
 * @property object            $privileges
 *
 * @extends Domain<WebHook>
 *
 *  @typescript
 */
class WebHook extends Domain {
    /**
     * Define
     *
     * @return void
     */
    public static function Define(): void {
        WebHook::Schema(WebHookSchema::Type());

        WebHook::Relationship('privileges', Privilege::Type(), WebHookPrivilegeSchema::Type());
        WebHook::Relationship('event', Event::Type());
    }

    /**
     * findByDomainEvent.
     *
     * @param string $domain
     * @param string $event
     *
     * @return WebHook[]|null
     */
    public static function findByDomainEvent($domain, $event) {
        return WebHook::where(
            Where::_And(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(WebHook::Schema()->Columns()->domain, $domain),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(WebHook::Schema()->Columns()->event, $event)
            )
        );
    }

    /**
     * validate.
     *
     * @param \vhs\domain\validations\ValidationResults $results
     *
     * @return void
     */
    public function validate(ValidationResults &$results) {
        // TODO: Implement validate() method.
    }
}
