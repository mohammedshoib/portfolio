<?php 
	/* 
		* all common functions of php
	*/
		function returnQueryResult($query) {
			$result = mysql_query($query);
			//if query failed, then log error	
			if(!$result) {
				php_log_error('Query failed'.$query);
				return false;
			}
			return $result;
		}

	/* 
		* log error
	*/
		function php_log_error($msg) {
			return;
		}


	/** 
		* escape special chars
	*/
		function validateString($str) {
			$str = trim($str);
			$str = mysql_real_escape_string($str);
			$str = htmlentities($str);
			return $str;
		}
?>