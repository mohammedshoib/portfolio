<?php 
/*
* It registers the user, if not available else proper message is displayed
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


class Register {
	private $user_id, $password, $conn;
	public function register_user($id, $pwd) {
		//assign it to global  var
		$this->user_id = $id;
		//encpt the password
		$this->password = md5($pwd);

		//get connection
		$this->conn = Connect::getDatabase();

		//get status of user existence 
		$userExists = $this->validate_user();
		
		if($userExists === 'error') {
			return 'error';
		} else if($userExists == false) {
			return false;
		}


		//else register user
		$status = $this->add_user();
		if($status === 'error') {
			return 'error';
		} else if($status == false) {
			return false;
		}

		//else register successfull
		return true;
	}

	//add user to db
	private function add_user() {
		//add entry in login table
		$sql = "insert into login(email,password,created_date) values('$this->user_id','$this->password', 'NOW()')";
		if(!executeSql($sql, $this->conn)) {
			return 'error';
		}

		//Note:- when ever new user is inserted, its pk should be added in register table
		//this is done by trigger refer db/triggers.txt
		return true;
	}

	//validate user
	//returns true if user doesn't exists
	private function validate_user() {
		$query = "select pk from login where email='$this->user_id'";
		$resource = executeSql($query, $this->conn);
		if($resource == false)  {
			return 'error';
		}
		$count = mysql_num_rows($resource);
		if($count > 0) {
			return false; //user already exists
		} else {
			return true; //means no user by this id
		}

	}

	//end of class
}
?>