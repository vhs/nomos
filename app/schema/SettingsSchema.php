<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 13/01/2015
 * Time: 2:46 PM
 */

namespace app\schema;

use app\security\PrivilegedAccess;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

class SettingsSchema extends Schema {
    /**
     * @return Table
     */
    public static function init() {
        $table = new Table('settings');

        $table->addColumn('site_name', Type::String(true, null, 50));
        $table->addColumn('site_email', Type::String(true, null, 40));
        $table->addColumn('site_url', Type::String(true, null, 200));
        $table->addColumn('reg_allowed', Type::Bool(false, true));
        $table->addColumn('user_limit', Type::Bool(false, false));
        $table->addColumn('reg_verify', Type::Bool(false, false));
        $table->addColumn('notify_admin', Type::Bool(false, false));
        $table->addColumn('auto_verify', Type::Bool(false, false));
        $table->addColumn('user_perpage', Type::String(false, '10', 4));
        $table->addColumn('thumb_w', Type::String(false, '', 4));
        $table->addColumn('thumb_h', Type::String(false, '', 4));
        $table->addColumn('backup', Type::String(true, null, 60));
        $table->addColumn('logo', Type::String(true, null, 40));
        $table->addColumn('currency', Type::String(true, null, 4));
        $table->addColumn('cur_symbol', Type::String(true, null, 8));
        $table->addColumn('mailer', Type::Enum('PHP', 'SMTP'));
        $table->addColumn('smtp_host', Type::String(true, null, 100));
        $table->addColumn('smtp_user', Type::String(true, null, 50));
        $table->addColumn('smtp_pass', Type::String(true, null, 50));
        $table->addColumn('smtp_port', Type::String(true, null, 6));
        $table->addColumn('is_ssl', Type::Bool(false, false));
        $table->addColumn('version', Type::String(true, null, 5));
        $table->addColumn('schemaversion', Type::Int(false, 2));
        $table->addColumn('nextpinid', Type::Int(false, 0));

        $table->setAccess(PrivilegedAccess::GenerateAccess('setting', $table));

        return $table;
    }
}
