<?php
  /**
   * Functions
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: functions.php, v2.00 2011-07-10 10:12:05 gewa Exp $
   */
  if (!defined("_VALID_PHP"))
      die('Direct access to this location is not allowed.');
  
  /**
   * redirect_to()
   * 
   * @param mixed $location
   * @return
   */
  function redirect_to($location)
  {
      if (!headers_sent()) {
          header('Location: ' . $location);
		  exit;
	  } else
          echo '<script type="text/javascript">';
          echo 'window.location.href="' . $location . '";';
          echo '</script>';
          echo '<noscript>';
          echo '<meta http-equiv="refresh" content="0;url=' . $location . '" />';
          echo '</noscript>';
  }
  
  /**
   * countEntries()
   * 
   * @param mixed $table
   * @param string $where
   * @param string $what
   * @return
   */
  function countEntries($table, $where = '', $what = '')
  {
      if (!empty($where) && isset($what)) {
          $q = "SELECT COUNT(*) FROM " . $table . "  WHERE " . $where . " = '" . $what . "' LIMIT 1";
      } else
          $q = "SELECT COUNT(*) FROM " . $table . " LIMIT 1";
      
      $record = Registry::get("Database")->query($q);
      $total = Registry::get("Database")->fetchrow($record);
      return $total[0];
  }
  
  /**
   * getChecked()
   * 
   * @param mixed $row
   * @param mixed $status
   * @return
   */
  function getChecked($row, $status)
  {
      if ($row == $status) {
          echo "checked=\"checked\"";
      }
  }
  
  /**
   * post()
   * 
   * @param mixed $var
   * @return
   */
  function post($var)
  {
      if (isset($_POST[$var]))
          return $_POST[$var];
  }
  
  /**
   * get()
   * 
   * @param mixed $var
   * @return
   */
  function get($var)
  {
      if (isset($_GET[$var]))
          return $_GET[$var];
  }
  
  /**
   * sanitize()
   * 
   * @param mixed $string
   * @param bool $trim
   * @return
   */
  function sanitize($string, $trim = false, $int = false, $str = false)
  {
      $string = filter_var($string, FILTER_SANITIZE_STRING);
      $string = trim($string);
      $string = stripslashes($string);
      $string = strip_tags($string);
      $string = str_replace(array('‘', '’', '“', '”'), array("'", "'", '"', '"'), $string);
      
	  if ($trim)
          $string = substr($string, 0, $trim);
      if ($int)
		  $string = preg_replace("/[^0-9\s]/", "", $string);
      if ($str)
		  $string = preg_replace("/[^a-zA-Z\s]/", "", $string);
		  
      return $string;
  }

  /**
   * cleanSanitize()
   * 
   * @param mixed $string
   * @param bool $trim
   * @return
   */
  function cleanSanitize($string, $trim = false,  $end_char = '&#8230;')
  {
	  $string = cleanOut($string);
      $string = filter_var($string, FILTER_SANITIZE_STRING);
      $string = trim($string);
      $string = stripslashes($string);
      $string = strip_tags($string);
      $string = str_replace(array('‘', '’', '“', '”'), array("'", "'", '"', '"'), $string);
      
	  if ($trim) {
        if (strlen($string) < $trim)
        {
            return $string;
        }

        $string = preg_replace("/\s+/", ' ', str_replace(array("\r\n", "\r", "\n"), ' ', $string));

        if (strlen($string) <= $trim)
        {
            return $string;
        }

        $out = "";
        foreach (explode(' ', trim($string)) as $val)
        {
            $out .= $val.' ';

            if (strlen($out) >= $trim)
            {
                $out = trim($out);
                return (strlen($out) == strlen($string)) ? $out : $out.$end_char;
            }       
        }
	  }
      return $string;
  }

  /**
   * truncate()
   * 
   * @param mixed $string
   * @param mixed $length
   * @param bool $ellipsis
   * @return
   */
  function truncate($string, $length, $ellipsis = true)
  {
      $wide = strlen(preg_replace('/[^A-Z0-9_@#%$&]/', '', $string));
      $length = round($length - $wide * 0.2);
      $clean_string = preg_replace('/&[^;]+;/', '-', $string);
      if (strlen($clean_string) <= $length)
          return $string;
      $difference = $length - strlen($clean_string);
      $result = substr($string, 0, $difference);
      if ($result != $string and $ellipsis) {
          $result = add_ellipsis($result);
      }
      return $result;
  }
  
  /**
   * getValue()
   * 
   * @param mixed $stwhatring
   * @param mixed $table
   * @param mixed $where
   * @return
   */
  function getValue($what, $table, $where)
  {
      $sql = "SELECT $what FROM $table WHERE $where";
      $row = Registry::get("Database")->first($sql);
      return ($row) ? $row->$what : '';
  }  

  /**
   * getValueById()
   * 
   * @param mixed $what
   * @param mixed $table
   * @param mixed $id
   * @return
   */
  function getValueById($what, $table, $id)
  {
      $sql = "SELECT $what FROM $table WHERE id = $id";
      $row = Registry::get("Database")->first($sql);
      return ($row) ? $row->$what : '';
  } 
  
  /**
   * tooltip()
   * 
   * @param mixed $tip
   * @return
   */
  function tooltip($tip)
  {
      return '<img src="'.SITEURL.'/images/tooltip.png" alt="Tip" class="tooltip" title="' . $tip . '" />';
  }
  
  /**
   * required()
   * 
   * @return
   */
  function required()
  {
      return '<img src="' . SITEURL . '/images/required.png" alt="Required Field" class="tooltip" title="Required Field" />';
  }

  /**
   * cleanOut()
   * 
   * @param mixed $text
   * @return
   */
  function cleanOut($text) {
	 $text =  strtr($text, array('\r\n' => "", '\r' => "", '\n' => ""));
	 $text = html_entity_decode($text, ENT_QUOTES, 'UTF-8');
	 $text = str_replace('<br>', '<br />', $text);
	 return stripslashes($text);
  }
    

  /**
   * isAdmin()
   * 
   * @param mixed $userlevel
   * @return
   */
  function isAdmin($userlevel)
  {
	  switch ($userlevel) {
		  case 9:
		     $display = '<img src="'.SITEURL.'/images/superadmin.png" alt="" class="tooltip" title="Super Admin"/>';
			 break;

		  case 7:
		     $display = '<img src="'.SITEURL.'/images/level7.png" alt="" class="tooltip" title="User Level 7"/>';
			 break;

		  case 6:
		     $display = '<img src="'.SITEURL.'/images/level6.png" alt="" class="tooltip" title="User Level 6"/>';
			 break;

		  case 5:
		     $display = '<img src="'.SITEURL.'/images/level5.png" alt="" class="tooltip" title="User Level 5"/>';
			 break;
			 
		  case 4:
		     $display = '<img src="'.SITEURL.'/images/level4.png" alt="" class="tooltip" title="User Level 4"/>';
			 break;		  

		  case 3:
		     $display = '<img src="'.SITEURL.'/images/level6.png" alt="" class="tooltip" title="User Level 3"/>';
			 break;

		  case 2:
		     $display = '<img src="'.SITEURL.'/images/level5.png" alt="" class="tooltip" title="User Level 2"/>';
			 break;
			 
		  case 1:
		     $display = '<img src="'.SITEURL.'/images/user.png" alt="" class="tooltip" title="User"/>';
			 break;			  
	  }

      return $display;;
  }

  /**
   * getSize()
   * 
   * @param mixed $size
   * @param integer $precision
   * @param bool $long_name
   * @param bool $real_size
   * @return
   */
  function getSize($size, $precision = 2, $long_name = false, $real_size = true)
  {
      if ($size == 0) {
          return '-/-';
      } else {
          $base = $real_size ? 1024 : 1000;
          $pos = 0;
          while ($size > $base) {
              $size /= $base;
              $pos++;
          }
          $prefix = _getSizePrefix($pos);
          $size_name = $long_name ? $prefix . "bytes" : $prefix[0] . 'B';
          return round($size, $precision) . ' ' . ucfirst($size_name);


      }
  }

  /**
   * _getSizePrefix()
   * 
   * @param mixed $pos
   * @return
   */  
  function _getSizePrefix($pos)
  {
      switch ($pos) {
          case 00:
              return "";
          case 01:
              return "kilo";
          case 02:
              return "mega";
          case 03:
              return "giga";
          default:
              return "?-";
      }
  }
  
  /**
   * userStatus()
   * 
   * @param mixed $id
   * @return
   */
  function userStatus($status, $id)
  {
	  switch ($status) {
		  case "y":
			  $display = '<i class="icon-ok-sign text-green"></i> Active';
			  break;
			  
		  case "n":
			  $display = '<a class="activate" id="act_' . $id . '"><i class="icon-adjust text-orange"></i> Inactive</a>';
			  break;
			  
		  case "t":
			  $display = '<i class="icon-time text-blue"></i> Pending';
			  break;
			  
		  case "b":
			  $display = '<i class="icon-ban-circle text-red"></i> Banned';
			  break;
	  }
	  
      return $display;;
  }

  /**
   * isActive()
   * 
   * @param mixed $id
   * @return
   */
  function isActive($id)
  {
	  if ($id == 1) {
		  $display = '<span class="tbicon"><a class="tooltip" data-title="Yes"><i class="icon-check"></i></a></span>';
	  } else {
		  $display = '<span class="tbicon"><a class="tooltip" data-title="No"><i class="icon-time"></i></a></span>';
	  }

      return $display;;
  }
  
  /**
   * barHeight()
   * 
   * @param mixed $total
   * @return
   */ 
  function barHeight($total)
  {
      switch ($total) {
          case ($total <= 10):
              print 10;
              break;
          case ($total >= 10 && $total <= 50):
              print 20;
              break;
          case ($total >= 50 && $total <= 100):
              print 30;
              break;
          case ($total >= 100 && $total <= 200):
              print 40;
              break;
          case ($total >= 200 && $total <= 300):
              print 50;
              break;
          case ($total >= 300 && $total <= 500):
              print 60;
              break;
          case ($total >= 500 && $total <= 700):
              print 70;
              break;
          case ($total >= 700 && $total <= 900):
              print 80;
              break;
          case ($total >= 900 && $total <= 1000):
              print 90;
              break;
          case ($total >= 1000 && $total > 3000):
              print 99;
              break;
      }
  }
  
  /**
   * randName()
   * 
   * @return
   */ 
  function randName() {
	  $code = '';
	  for($x = 0; $x<6; $x++) {
		  $code .= '-'.substr(strtoupper(sha1(rand(0,999999999999999))),2,6);
	  }
	  $code = substr($code,1);
	  return $code;
  }
?>