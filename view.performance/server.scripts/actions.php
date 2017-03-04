<?php 
/*
* start the session first
*/
session_start();

/*
* set time zone to asiz/calcutta
*/
date_default_timezone_set('Asia/Calcutta');

/*
* This file actions.php file contains many operations
* action is post parameter, which is used to decide what kind of operation is going to happen
*/


/*
* $response is a array used for responding to client
* It contains status index and formatted message
*/
$response = array(
	"status"  => false,
	"message" => "What's up bro! no response?"	
	);


/* 
* $action is post paramter
*/
$action = isset($_POST['action'])?$_POST['action']:false;

/*
* If empty action then respond to user with message
*/
if($action === false) {
	$response['message'] = "Please specify action type!";
	echo json_encode($response);
	exit;
}


/*
* Switch is router for differnt kind operation
*/
switch ($action) {
	case 'register':
	case 'login':
		$user_id = htmlentities($_POST['email']);
		$passwd  = htmlentities($_POST['password']);

		$success = 'successfull';
		$failure = 'Something wrong! We are working on it to fix';
		//if register
		if($action == 'register') {
			//get the register file
			require 'register.php';
			$register = new Register();
			$result   = $register->register_user($user_id, $passwd);
			//in case if failure this msg will set, by default it will be successful, check below if 
			//condition
			$msg      = 'User id already exists. Please try different user id!';
		} else if($action == 'login') { 
			//validate user
			require 'login.php';
			$result = Login::validateMe($user_id, md5($passwd));
			if($result === false)  {
				$msg = 'Invalid email id & password';
			}
		}

		if($result === 'error') {
			$response['message'] = $failure;
		} else if($result === false) {
			$response['message'] = $msg;
		} else {
			//means user is registered
			$response['status']  = true;
			$response['message'] = $success;
		}	
		
		break;

	case 'jserrorlog':
		require('common.functions.php');
		javascriptErrorLog($_POST['message']);
		$response['status']  = true;
		$response['message'] = 'Logged js error!';
		break;

	
	default:
		# code...
		break;
}


/*
* Finally respond to client
*/
echo json_encode($response);
exit;

?>