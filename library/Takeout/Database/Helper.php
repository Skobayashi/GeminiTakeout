<?php


namespace Takeout\Database;

use Takeout\Database;

class Helper
{
    
    public static function getConnection ($client)
    {
        $config   = new \Zend_Config_Ini(APPLICATION_PATH.'/configs/database.ini', $client);
        $db_name  = $config->db->db;
        $host     = $config->db->host;
        $user     = $config->db->username;
        $password = $config->db->password;
        $dsn      = 'mysql:dbname='.$db_name.';host='.$host;

        try {
            $db = new Database($dsn, $user, $password);
            $db->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_OBJ);
            $db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            \Zend_Registry::set('db', $db);

        } catch (\PDOException $e) {
            throw new \Exception($e->getMessage());
        }
    }
}
