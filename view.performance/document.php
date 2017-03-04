<html>
<head>
	<title> Documentation </title>
</head>
<body>
	<h1> View.Performance</h1>

	<p> 
		<h3> Login Process </h3>
		<ol>
			<li>
				Takes the email id and password, validates.
			</li>
			<li>
				Once validation is successfull, it creates md5 of email id which is known as
			</li>
			<li>
				token, it sets md5(email) in cookie var i.e token.
			</li>
			<li>
				The token is index array in session which contains email id and login time currently
			</li>
			<li>
				Every time browser is reloaded or reopned, token is fetched from cookie and it checks whether session exists by that name if so then continues else it checks with cookie table in db then validates for expiry if it is less than of 30 mins then sets the session and continues.
			</li>
			<li>
				If db cookie is expired then it will redirects for login page, by setting cookie end time and making flag as automatic i.e 2, and it clears cookie 
			</li>
		</ol>
	</p>
</body>
</html>