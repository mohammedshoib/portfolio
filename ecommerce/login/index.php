<?php 
	session_start(); 
	//validate user login
	if(!isset($_SESSION['user'])) {
		//header('Location:../');
		//exit;
	}
	//take user name
	$userName = 'shoibMohammed'; //$_SESSION['user'];
?>
<!DOCTYPE html>
<html> 
	<head>
		<meta charset="utf-8" />
		<title> <?php echo $userName; ?></title>
		<!-- load tab icon -->
		<link rel="shortcut icon"  href="icons/momeen.ico" />
		<!-- load default.css -->
		<link rel="stylesheet" type="text/css" href="../css/default.css" />
		<!-- login.css all css of login page is here -->
		<link rel="stylesheet" type="text/css" href="../css/login.css" />
	</head>
	<body>
		<!-- if javascript is disabled -->
		<noscript>
			<div style='posistion:fixed;top:0;bottom:0;left:0;right:0;background-color:white;'> Javascript is disabled</div>
		</noscript>
		<!-- first show skeleton then using ajax fill the skeleton with proper data -->
		<div id='container'>
			<div id='header'>
				<div id='logo'></div>
				<div id='userName'>
				  <span> Welcome: </span>
					<?php echo $userName; ?>
				</div>
			</div>
			<div id='tabs'></div>
			<div id='tools'></div>
			<div id='body'></div>
			<div id='footer'>
				<div id='notification'></div><div id='footer_text'><span>&copy; </span>Copyright protected to <a href='http://www.momeen.com' target="_blog">momeen.com</a>. All right reserved / <a href='#'> Policies </a> &nbsp;/ <a href='#' > Security </a></div>
			</div>
		</div>

		<!-- jquery lib here jquery-1.10.2 -->
		<script type="text/javascript" src="../libraries/jquery-1.10.2.js"></script>
		<!-- login.js all javascript of login page is here -->
		<script type="text/javascript" src="../js/login.js"></script>
	</body>
</html>