<?php
  /**
   * Class Registry
   *
   * @package Freelance Manager
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: class_registry.php, v1.00 2011-04-20 18:20:24 gewa Exp $
   */

  if (!defined("_VALID_PHP"))
      die('Direct access to this location is not allowed.');
	  
  abstract class Registry
  {
      static $objects = array();


      /**
       * Registry::get()
       * 
       * @param mixed $name
       * @return
       */
      public static function get($name)
      {
          return isset(self::$objects[$name]) ? self::$objects[$name] : null;
      }

      /**
       * Registry::set()
       * 
       * @param mixed $name
       * @param mixed $object
       * @return
       */
      public static function set($name, $object)
      {
          self::$objects[$name] = $object;
      }
  }
?>