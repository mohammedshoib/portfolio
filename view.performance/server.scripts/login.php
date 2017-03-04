<?php 
/*
* This will return true or false or error, based on user input
* takes two params, and check in db for valid authentication
* If validation is success then it sets cookie and session varaible i.e token
* token is nothing but md5 of email id, which is an array in case of session
* which contains email id and login time
*/

/* 
* Include common.functions.php file
* Here all common functions used accross application is written in this file
*/
include 'common.functions.php';

/*
* require connection class 
*/
require 'connect.php';


class Login {

	static function validateMe($email, $pwd) {
		//first get db connection
		$conn = Connect::getDatabase();

		$query = "select count(pk) as count from login where email='$email' and password='$pwd'";
		$resource = executeSql($query, $conn);
		if(!$resource) {
			return 'error';
		}
		$result = mysql_fetch_assoc($resource);
		$count  = $result['count'];

		if($count == 0) {
			return false;
		} else {

			//md5 of email id, used as token through out app
			$token = md5($email);

			//validate with cookie table, if already exists then just return true;
			$status = validateCookie($token, $conn);
			if($status === true) {
				return true;
			}
			//set cookied in db first
			$status = setCookieInDb($token, $conn);
			if(!$status) {
				//log error
				$msg = "Failed while setting cookie in database. Please fix";
				errorlog($msg);
				return false;
			}

			//set global cookie accros directories, spent more than an hour to write below line
			// Note: make user you use time() function in expirydate otherwise it expires becuase
			//it takes unix time stamp from 1970*
			//set cookie
			$host = $_SERVER['HTTP_HOST']!='localhost'?$_SERVER['HTTP_HOST']:'';
			setcookie('token', $token, time()+1800, '/', "$host",0);
			$_SESSION[$token]  = array();
			$_SESSION[$token]['email']  = $email;
			$_SESSION[$token]['logintime']  = date('Y-m-d H:i:s');
			return true;
		}
		//check
	}
}
?>