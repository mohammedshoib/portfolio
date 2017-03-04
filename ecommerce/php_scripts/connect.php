<?php 
	$host = 'localhost';
	$user = 'root';
	$pwd  = '';
	$db   = 'ecommerce';

	$conn = mysql_connect($host, $user, $pwd);
	if(!$conn) {
		echo 'Failed to connect';
		exit;
	}
	if(!mysql_select_db($db, $conn)) {
		echo 'Failed to connect to db';
		exit;
	}
?>