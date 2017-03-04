<?php 
/** 
* it recieves md5 of email has get parameter, if email exists then convert status, i.e confirmed
*/
if(!isset($_GET['token'])) {
	exit('Inavlid access to file.');
}
//include connection file
require_once('connect.php');

$token = stripcslashes( $_GET['token'] );

$query = "select count(flag) as c, email, flag from register where token = '$token'";
$resource = mysql_query($query);
$result = mysql_fetch_assoc($resource);
if($result['c']  == 0) { ?>
   <center>
	<h2 style="color:red;"> Invalid token. Check the token properly with email sent to you! </h2>
   </center>
<?php exit; }
$flag = $result['flag'];
if($flag == 2) { ?>
   <center>
	<h2 style="color:green;"> This email id is already confirmed you can try login! </h2>
   </center>
<?php } else {
 $email = $result['email'];
 $sql = "update register set flag=2 where token='$token'";
 if(mysql_query($sql)) { ?>
    <center>
	 <h2 style="color:green;"> Thank You. <?php echo $email; ?> is confirmed now! You can try login now! </h2>
   </center>
 <?php } else { 
 	$to   = 'mohammedshoib@momeen.com';
 	$from = 'no-reply@momeen.com';
 	$headers  = "From: "."$from"."\r\n";
	$headers .= "Reply-To: "."$from"."\r\n";
	$headers .= "MIME-Version:1.0\r\n";
	$headers .= "Content-Type:text/html; charset=ISO-8859-1\r\n";
 	$subject  = 'Failed to confirm user subcription';
 	$message  = "<table><tr><th>Email</th><td>$email</td></tr></table>";
 	//send mail
 	$mail = @mail($to, $subject, $message, $headers);
 ?>
   <center>
	<h2 style="color:red;"> Failed to confirm! Issue as been reported to admin. Will get back to you as soon as possible. </h2>
   </center>
<?php }
}


?>