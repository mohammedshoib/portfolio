<?php 
/*
* start the session
*/
session_start();

/*
* set time zone to asiz/calcutta
*/
date_default_timezone_set('Asia/Calcutta');

/*
* Include madatory php files
*/
include 'server.scripts/connect.php';
include 'server.scripts/common.functions.php';

/*
* validate the user
*/
$token = $_COOKIE['token'];
if($token == '') {
	header('Location: index.php?auth=false');
	exit;
}

/*
* check if this token exists in session else validate cookie with db for expiry
*/

$conn = Connect::getDatabase();
if(!isset($_SESSION[$token])) {
	$status = validateCookie($token, $conn);
	if($status === false) {	
		$host = $_SERVER['HTTP_HOST']!='localhost'?$_SERVER['HTTP_HOST']:'';
	    setcookie('token', null, -1, '/',"$host",0);
		header('Location: index.php?auth=timeout');
		exit;
	}
}

/*
* Test data, remove this when completed
*/
$profile = getProfileDetails($conn, $token);
if($profile['status'] === false) {
	header('Location: index.php?auth=nodetails');
	exit;	
}
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/transitional.dtd">
<html>
	<head>
		<title>Welcome</title>
		
		<!-- Author of document -->
		<META name="Author" content="Shoib Mohammed A - momeen.com">
		<!--  US English -->
		<META name="keywords" lang="en-us" content="vacation, Greece, sunshine">
		<!--  Character encoding -->
		<META http-equiv="Content-Type" content="text/html; charset=ISO-8859-5"> 
		<!-- Add favico -->	
		<link rel="shortcut icon" type="text/css" href="images/momeen.ico" />

		<!-- neautralize dom elements properties -->
		<link rel="stylesheet" type="text/css" href="css/default.css" />
		<!-- inlcude homepage.css which contains basic css of the page -->
		<link rel="stylesheet" type="text/css" href="css/homepage.css" />

		<!-- inlcude animation css file of homepage -->
		<link rel="stylesheet" type="text/css" href="css/homepage-animation.css" />
		<!-- momeen.theme.css -->
		<link rel="stylesheet" type="text/css" href="css/momeen.theme.css" />
	</head>

	<body>

		<!-- master container -->
		<div id="homepage-toplevel-container">
			<!-- header color container -->
			<div id="header-theme-color">				
				<div class="master-width header"> 
					<!-- profile picture -->
					<div id="profile-picture" style="background-image:url('<?php echo $profile['pic']; ?>');"></div>
					<!-- show logged inn name, working and education -->
					<div id="profile-toplevel-details-container">
						<!-- loop through each profile array, concat in var, and finally display  -->
						<ul id="profile-toplevel-details">
							<?php $li = ''; foreach($profile['details'] as $value) { ?>
							 <?php $li .= "<li>$value</li>"; ?>
							<?php } echo $li; ?>
						</ul>
					</div>
				</div>
			</div>

			<!-- body container -->
			<div id="homepage-body-container">
				<!-- this container shows the graph for selected company -->
				<div id="homepage-graph-container">
					<!-- select project container -->
					<div id="select-project-container">
						<span id="selected-project-name" class="homepage-body-titles">Select Project</span>
					</div>
					<!-- graph are -->
					<div id="homepage-graph-area"></div>
				</div>
				<!-- this container consits of selected company details, and also allows to add -->
				<div id="homepage-graph-details-container">
					<!-- add feature -->
					<div id="add-feature">
						<span id="add-feature-name" class="homepage-body-titles"> Add</span>
					</div>

					<!-- details list -->
					<div id="features-list-container"></div>
				</div>
			</div>
		</div>

		<!-- add new project -->
		<div id="new-project" title="Add new project/company"> NEW </div>

		<!-- common js which will be shared accross the applicaton -->
		<script type="text/javascript" src="js/common.functions.js"></script>

		<!-- load jquery here -->
		<script type="text/javascript" src="libraries/jquery-1.10.2.js"></script>

		<!-- highcharts -->
		<script type="text/javascript" src="libraries/Highcharts-4.0.1/js/highcharts.js"></script>
		<script type="text/javascript" src="libraries/Highcharts-4.0.1/js/highcharts-more.js"></script>
		<script type="text/javascript" src="libraries/Highcharts-4.0.1/js/highcharts-3d.js"></script>
		<script type="text/javascript" src="libraries/Highcharts-4.0.1/js/modules/exporting.js"></script>

		<!-- Momeen.js, custom api's for popup messages with animations -->
		<script type="text/javascript" src="js/momeen.theme.js"></script>

	</body>
</html>
