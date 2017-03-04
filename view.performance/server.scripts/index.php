
<?php 
	date_default_timezone_set('Asia/Calcutta');
	$created = strtotime('2014-08-09 18:00:00');
	$t = time();
	$diff = (($t-$created)/(60));
	echo '<pre>';
	 echo $diff;
	echo '</pre>';
	
?>