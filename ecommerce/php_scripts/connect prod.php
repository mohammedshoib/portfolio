<?php 
	$host = '166.62.8.79';
	$user = 'eCommerceMomeen';
	$pwd  = 'Shoib@786';
	$db   = 'eCommerceMomeen';

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