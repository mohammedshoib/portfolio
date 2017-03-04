<?php 
/* 
* All common php functions are used here
*/

/* 
* Execute query and return resource id else log error then return false
*/
function executeSql($sql, $conn) {

	//black box 
	blackbox($sql);

	$result = mysql_query($sql, $conn);

	if($result) {
		return $result;
	} else {
		//log error and return false
		$msg = "Query failed, \t $sql";
		errorlog($msg);
		return false;
	}
}

/*
* Validate cookie, it checks with cookie table with md5 #(token), if cookie is expired
* and type is empty then it sets endtime and returns false else it returns true
*/
function validateCookie($token, $conn) {
	$query    = "select created,id from cookie where token='$token' and type ='0' or type=null order by id desc limit 1";
	$resource = executeSql($query, $conn);
	$result   = mysql_fetch_assoc($resource);
	$count    = count($result);
	if($count == 0) {
		return false;
	}
	$id      = $result['id'];
	$created = strtotime($result['created']);
	$current = time();
	$minutes = ($current-$created)/60; 
	// echo date_default_timezone_get();
	// echo $result['created'], ',',$current, ',',$created;
	if($minutes >= 30) {
		//set end time
		$sql = "update cookie set endtime=NOW(), type=2 where id=$id";
		$resource = executeSql($sql, $conn);
		return false;
	}

	return true;
}

/*
* returs array
* connection parameter required and token
* it just returns logged in user details like name, country etc
*/
function getProfileDetails($conn,$token) {
	$email = $_SESSION[$token]['email'];
	$result = array("status"=>true);
	//get details from the db
	$query = "select name,picture,degree,country from register left join login on login.pk=register.login_pk where login.email='$email'";
	$resource = executeSql($query, $conn);
	if(!$resource) {
		$result['status'] = false;
	} else {
		$dbResult = mysql_fetch_assoc($resource);
		$result['pic'] = $dbResult['picture'];
		$result['details']['name']    = $dbResult['name'];
		$result['details']['degree']  = $dbResult['degree'];
		$result['details']['country'] = $dbResult['country'];
	}
	return $result;
}

/*
* set the cookie
*/
function setCookieInDb($token, $conn) {
	$browser = 'testing';
	$sql 	 = "insert into cookie(token, created, browser_details) values('$token', NOW(), '$browser')";
	$resource = executeSql($sql, $conn);
	if(!$resource) {
		return false;
	}
	return true;
}


/*
* This logs the exact error
*/
function errorlog($msg) {
	$msg = "\r\n". date('Y-m-d H:i:s')."\t $msg";
	$file = '..\errolog.log';
	file_put_contents($file, $msg, FILE_APPEND);
}

/*
* Log javascript errors
*/
function javascriptErrorLog($msg) {
	$msg = "\r\n". date('Y-m-d H:i:s')."\t $msg";
	$file = '..\javascript.error.log';
	file_put_contents($file, $msg, FILE_APPEND);		
}

/*
* this will record, into separate file
*/
function blackbox($data) {
	$data = "\r\n".date('Y-m-d H:i:s')."\t".$data;
	$file = '..\blackbox.log';
	file_put_contents($file, $data, FILE_APPEND);
}
?>