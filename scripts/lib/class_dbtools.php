<?php
  /**
   * DB Tools Class
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: class_dbtools.php, v2.00 2011-07-10 10:12:05 gewa Exp $
   */
  
  if (!defined("_VALID_PHP"))
      die('Direct access to this location is not allowed.');
	    
  class dbTools
  {
      private $tables = array();
      const suffix = "d-M-Y_H-i-s";
	  const nl = "\r\n";
      
      
      /**
       * dbTools::doBackup()
       * 
       * @param string $fname
       * @param bool $gzip
       * @return
       */
      public function doBackup($fname = '', $gzip = true)
      {
          
          if (!($sql = $this->fetch())) {
              return false;
          } else {
              $fname = BASEPATH . 'admin/backups/';
              $fname .= date(self::suffix);
              $fname .= ($gzip ? '.sql.gz' : '.sql');

              $this->save($fname, $sql, $gzip);

              $ext = ($gzip ? '.sql.gz' : '.sql');
              $data['backup'] = date(self::suffix) . $ext;
              Registry::get("Database")->update("settings", $data);

              if (Registry::get("Database")->affected())
                  redirect_to("index.php?do=backup&backupok=1");
          }
      }

      /**
       * dbTools::doRestore()
       * 
       * @param string $fname
       * @return
       */
	  public function doRestore($fname)
	  {
		  
          $filename = BASEPATH . 'admin/backups/' . trim($fname);
          $templine = '';
          $lines = file($filename);
          foreach ($lines as $line_num => $line) {
              if (substr($line, 0, 2) != '--' && $line != '') {
                  $templine .= $line;
                  if (substr(trim($line), -1, 1) == ';') {
                      if (!Registry::get("Database")->query($templine)) {
                          Filter::msgError("<span>'" . mysqli_errno() . " " . mysqli_error() . "' during the following query:</span> 
						  <div>{$templine}</div>");
                      }
                      $templine = '';
                  }
              }
          }
          return true;
	  }
        
      /**
       * dbTools::getTables()
       * 
       * @return
       */
      private function getTables()
      {
          $value = array();
          if (!($result = Registry::get("Database")->query('SHOW TABLES'))) {
              return false;
          }
          while ($row = Registry::get("Database")->fetchrow($result)) {
              if (empty($this->tables) or in_array($row[0], $this->tables)) {
                  $value[] = $row[0];
              }
          }
          if (!sizeof($value)) {
              Filter::msgError("<span>Error!</span>No tables found in database");
              return false;
          }
          return $value;
      }
      
      
      /**
       * dbTools::dumpTable()
       * 
       * @param mixed $table
       * @return
       */
      private function dumpTable($table)
      {
          $damp = '';
          Registry::get("Database")->query('LOCK TABLES ' . $table . ' WRITE');

          $damp .= '-- --------------------------------------------------' . self::nl;
          $damp .= '# -- Table structure for table `' . $table . '`' . self::nl;
          $damp .= '-- --------------------------------------------------' . self::nl;
          $damp .= 'DROP TABLE IF EXISTS `' . $table . '`;' . self::nl;

          if (!($result = Registry::get("Database")->query('SHOW CREATE TABLE ' . $table))) {
              return false;
          }
          $row = Registry::get("Database")->fetch($result, true);
          $damp .= str_replace("\n", self::nl, $row['Create Table']) . ';';
          $damp .= self::nl . self::nl;
          $damp .= '-- --------------------------------------------------' . self::nl;
          $damp .= '# Dumping data for table `' . $table . '`' . self::nl;
          $damp .= '-- --------------------------------------------------' . self::nl . self::nl;
          $damp .= $this->insert($table);
          $damp .= self::nl . self::nl;
          Registry::get("Database")->query('UNLOCK TABLES');
          return $damp;
      }
      
      
      /**
       * dbTools::insert()
       * 
       * @param mixed $table
       * @return
       */
      private function insert($table)
      {
          $output = '';
          if (!$query = Registry::get("Database")->fetch_all("SELECT * FROM `" . $table . "`", true)) {
              return false;
          }
          foreach ($query as $result) {
              $fields = '';

              foreach (array_keys($result) as $value) {
                  $fields .= '`' . $value . '`, ';
              }
              $values = '';

              foreach (array_values($result) as $value) {
                  $value = str_replace(array("\x00", "\x0a", "\x0d", "\x1a"), array('\0', '\n', '\r', '\Z'), $value);
                  $value = str_replace(array("\n", "\r", "\t"), array('\n', '\r', '\t'), $value);
                  $value = str_replace('\\', '\\\\', $value);
                  $value = str_replace('\'', '\\\'', $value);
                  $value = str_replace('\\\n', '\n', $value);
                  $value = str_replace('\\\r', '\r', $value);
                  $value = str_replace('\\\t', '\t', $value);

                  $values .= '\'' . $value . '\', ';
              }

              $output .= 'INSERT INTO `' . $table . '` (' . preg_replace('/, $/', '', $fields) . ') VALUES (' . preg_replace('/, $/', '', $values) . ');' . "\n";
          }
          return $output;
      }
      
      /**
       * dbTools::fetch()
       * 
       * @return
       */
      private function fetch()
      {
          $dump = '';

          $database = Registry::get("Database")->getDB();
          $server = Registry::get("Database")->getServer();
		  $link = Registry::get("Database")->getLink();

          $dump .= '-- --------------------------------------------------------------------------------' . self::nl;
          $dump .= '-- ' . self::nl;
          $dump .= '-- @version: ' . $database . '.sql ' . date('M j, Y') . ' ' . date('H:i') . ' gewa' . self::nl;
          $dump .= '-- @package Membership Manager Pro' . self::nl;
          $dump .= '-- @author wojoscripts.com.' . self::nl;
          $dump .= '-- @copyright 2011' . self::nl;
          $dump .= '-- ' . self::nl;
          $dump .= '-- --------------------------------------------------------------------------------' . self::nl;
          $dump .= '-- Host: ' . $server . self::nl;
          $dump .= '-- Database: ' . $database . self::nl;
          $dump .= '-- Time: ' . date('M j, Y') . '-' . date('H:i') . self::nl;
          $dump .= '-- MySQL version: ' . mysqli_get_server_info($link) . self::nl;
          $dump .= '-- PHP version: ' . phpversion() . self::nl;
          $dump .= '-- --------------------------------------------------------------------------------' . self::nl . self::nl;

          $database = Registry::get("Database")->getDB();
          if (!empty($database)) {
              $dump .= '#' . self::nl;
              $dump .= '# Database: `' . $database . '`' . self::nl;
          }
          $dump .= '#' . self::nl . self::nl . self::nl;

          if (!($tables = $this->getTables())) {
              return false;
          }
          foreach ($tables as $table) {
              if (!($table_dump = $this->dumpTable($table))) {
                  Filter::msgError("mySQL Error : ");
                  return false;
              }
              $dump .= $table_dump;
          }
          return $dump;
      }
      
      
      /**
       * dbTools::save()
       * 
       * @param mixed $fname
       * @param mixed $sql
       * @param mixed $gzip
       * @return
       */
      private function save($fname, $sql, $gzip)
      {
          if ($gzip) {
              if (!($zf = gzopen($fname, 'w9'))) {
                  Filter::msgError("<span>Error!</span>can not write to " . $fname);
                  return false;
              }
              gzwrite($zf, $sql);
              gzclose($zf);
          } else {
              if (!($f = fopen($fname, 'w'))) {
                  Filter::msgError("<span>Error!</span>can not write to " . $fname);
                  return false;
              }
              fwrite($f, $sql);
              fclose($f);
          }
          return true;
      }
      
      /**
       * dbTools::showTables()
       * 
       * @param mixed $dbtable
       * @return
       */
      private function showTables($dbtable)
      {
          $database = Registry::get("Database")->getDB();

          $sql = "SHOW TABLES FROM " . $database;
          $result = Registry::get("Database")->query($sql);
          $show = '';

          while ($row = Registry::get("Database")->fetchrow($result)):
              $selected = ($row[0] == $dbtable) ? " selected=\"selected\"" : "";
              $show .= "<option value=\"" . $row[0] . "\"" . $selected . ">" . $row[0] . "</option>\n";
          endwhile;

          Registry::get("Database")->free($result);

          return ($show);
      }
  }
?>