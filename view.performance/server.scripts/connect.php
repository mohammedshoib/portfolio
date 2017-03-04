<?php 
/*
* connection class, will return connection else exits with proper message
*/
class Connect {

	static function getDatabase() {
		 $host='localhost'; $user='root'; $pwd=''; $db='viewdotperformance';
		$connection = mysql_connect($host, $user, $pwd);
		if(!$connection) {
			echo 'Invalid username and password for db';
			exit;
		}
		if(!mysql_select_db($db, $connection)) {
			echo 'Could not connect to database';
			exit;
		}

		return $connection;
	}
}


?>