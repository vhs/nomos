<?php
/**
 * Created by PhpStorm.
 * User: Jarrett
 * Date: 20/02/2016
 * Time: 3:57 PM
 */

namespace vhs\migration;

use vhs\Logger;
use vhs\loggers\SilentLogger;

class Backup {

    private $server;
    private $user;
    private $password;
    private $database;
    private $logger;

    function __construct($server, $user, $password, $database, Logger $logger = null) {
        $this->server = $server;
        $this->user = $user;
        $this->password = $password;
        $this->database = $database;

        if(is_null($logger))
            $this->logger = new SilentLogger();
        else
            $this->logger = $logger;
    }

    private function is_mysql_num($type) {
        //http://php.net/manual/en/mysqli-result.fetch-field.php
        
        switch($type) {
            case 1:     //TINYINT / BOOL
            case 2:     //SMALLINT
            case 3:     //INTEGER
            case 4:     //FLOAT
            case 5:     //DOUBLE
            //case 7:     //TIMESTAMP - not an int, but treated similar here
            case 8:     //BIGINT / SERIAL
            case 9:     //MEDIUMINT
            case 16:    //BIT
            case 246:   //DECIMAL / NUMERIC / FIXED
                return true;
                break;
            default:
                return false;
        }
    }

    public function external_backup($do_host = false, $fileName = null, $backupPath = "backup/") {
        $this->logger->log('Starting backup');
        
        $fileName =  (!is_null($fileName)) ? $fileName : 'db-backup-' . time() . '.sql';

        $command = array();
        $command[] = "mysqldump";
        $command[] = "-u '" . $this->user . "'";
        $command[] = "-p " . $this->password;
        if($do_host == true)
            $command[] = "--host " . $this->server;
        $command[] = "'" . $this->database . "'";
        $command[] = ">";
        $command[] = "'" . $backupPath . $fileName . "'";

        exec(implode(" ", $command), $output, $return);
        
        if(!$return)
            return true;
        else
            return false;
    }

    public function internal_backup($fileName = null, $backupPath = "backup/") {

        $this->logger->log('Starting backup');
        
        $conn = new \mysqli($this->server, $this->user, $this->password);
   
        if ($conn->connect_error) {
            $this->logger->log("Connection failed: " . $conn->connect_error);
            return false;
        }

        $conn->select_db($this->database);

        $return = '';
        $tables = array();
        $sql = 'SHOW TABLES';
        $i = 0;
        $result = $conn->query($sql);
        if(!$result)
            return false;

        //Grab all tables
        while($row = $result->fetch_array())
        {
            $tables[] = $row[0];
            $i++;
        }

        $this->logger->log("Database tables: " . $i);

        foreach($tables as $table)
        {
            $sql = 'SHOW CREATE TABLE `' . $table . '`;';
            print('Grabbing table ' . $table . ': ');
            
            
            $create_result = $conn->query($sql);
            if(!$result)
                return false;
            $create_row = $create_result->fetch_row();
            $return .= $create_row[1];
            
            $sql = 'SELECT * FROM `' . $table . '`;';
            
            $result = $conn->query($sql);
            if(!$result)
                return false;
            $num_fields = @intval($result->num_rows);

            $return .= ";\nINSERT INTO `" . $table . '` VALUES(';
            
            $types = $result->fetch_fields();

            //Grab all keys
            for($i = 0; $keys = $result->fetch_row(); $i++) {

                if($i)
                    $return .= "),\n(";
                
                $firstKey = 1;
                $e = 0;
                foreach($keys as $key) {
                    
                    $key = $conn->escape_string($key);
                    
                    if($this->is_mysql_num($types[$e]->type)) {
                        if(!$key && $key !== 0 && $key !== '0') {
                            $key = 'NULL';
                        }
                    } else {
                        $key = '\''. $key .'\'' ;
                    }
                    
                    if (!$firstKey)
                        $return .= ' , ';
                    $return .= $key;
                    $firstKey = 0;
                    $e++;
                }

            }
            $return.= ");\n";
            
            print($i . " keys.\n");

        }

        $fileName =  (!is_null($fileName)) ? $fileName : 'db-backup-'.time().'-'.(md5($return)).'.sql';
        $handle = fopen($backupPath . $fileName,'w+');
        fwrite($handle, $return);
        fclose($handle);
        
        return true;

    }
}
