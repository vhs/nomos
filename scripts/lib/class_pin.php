<?php

if (!defined("_VALID_PHP"))
    die('Direct access to this location is not allowed.');

class PIN
{
    const rTable = "accesslog";
    public $id = 0;
    public $pin;
    public $last;
    private static $db;

    /**
     * PIN::__construct()
     */
    function __construct()
    {
        self::$db = Registry::get("Database");
    }

    /**
     * PIN::log()
     *
     * @param mixed $pin
     * @param mixed $authorized
     * @return bool
     **/
    function log($pin, $authorized)
    {
        //print("Logging\n");
        $now = date('Y-m-d H:i:s');

        $data['time'] = $now;
        $data['pin'] = sanitize($pin);
        if($authorized == 1) {
            $data['authorized'] = 1;
        } else {
            $data['authorized'] = 0;
        }
        $data['from_ip'] = $_SERVER['REMOTE_ADDR'];
        //print_r($_SERVER);

        $result = self::$db->insert('accesslog', $data);
        if (!$result) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * PIN::auth()
     *
     * @param mixed $spin
     * @return bool
     **/
    function auth($spin)
    {
        if(strlen($spin) != 8) return 0; //invalid pin

        $pinid = substr($spin, 0, 4);
        $pin = substr($spin, 4, 4);

        if(!is_numeric($pinid) || !is_numeric($pin)) return 0;

        $pinid = intval($pinid);
        $pin = intval($pin);

        /*
          select 1 from users u
          left join memberships m on u.membership_id = m.id
          where m.title = 'Key holder'
          and m.active = 1
          and u.vetted = 1
          and u.active = 'y'
          and u.pinid = 2
          and u.pin = 5555
         */

        $sql = "select 1 from users u";
        $sql .= " left join memberships m on u.membership_id = m.id";
        $sql .= " where m.title = 'Key holder'";
        $sql .= " and m.active = 1";
        $sql .= " and u.active = 'y'";
        $sql .= " and u.pinid = " . self::$db->escape($pinid);
        $sql .= " and u.pin = " . self::$db->escape($pin);

        $result = self::$db->query($sql);
        if ($result && (self::$db->numrows($result) == 1)) {
            self::log($spin, 1);
            return 1;
        } else {
            self::log($spin, 0);
            return 0;
        }
    }

    /**
     * PIN::getPIN()
     *
     * @param mixed $userid
     * @return string
     **/
    function getPIN($userid)
    {
        $userid = intval($userid);

        $sql = "SELECT pinid, pin FROM users WHERE id = ".self::$db->escape($userid);
        $result = self::$db->query($sql);
        if (!$result || (self::$db->numrows($result) < 1)) {
            return null;
        }

        $row = self::$db->fetch($result);

        if (is_null($row->pinid) || is_null($row->pin)) {
            return null;
        } else {
            return sprintf("%04s", $row->pinid) . sprintf("%04s", $row->pin);
        }
    }

    /**
     * PIN::getLatest()
     *
     * @return mixed
     **/
    function getLatest()
    {
        $sql = "SELECT * FROM accesslog WHERE pin is not null ORDER BY `time` DESC LIMIT 0,15";
        $result = self::$db->query($sql);
        if (!$result || (self::$db->numrows($result) < 1)) {
            return 0;
        }
        $i = 0;

        while($row = self::$db->fetch($result)) {
            $time = new DateTime($row->time);
            $now = new DateTime(date('Y-m-d H:i:s'));
            $age = $now->diff($time);

            if($age->y == 0 && $age->m == 0 && $age->d == 0 && $age->h == 0 && $age->i <= 5) {
                $out[$i] = $row->pin;
                $i++;
                if($i >= 5) {
                    return $out;
                }
            }
        }
        if(isset($out)) {
            return $out;
        }
        return 0;
    }
}
