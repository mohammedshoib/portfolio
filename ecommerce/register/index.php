<!DOCTYPE html>
<html> 
	<head>
		<meta charset="utf-8" />
		<title> Advertise your products here, and we help you to grow your business. </title>
		<!-- load tab icon -->
		<link rel="shortcut icon"  href="../icons/momeen.ico" />
		<!-- internal css  -->
		<style type="text/css">
			.mandatory {
				color: red;
			}
			.missing {
				border: solid 1px red;
			}
		</style>
	</head>
	<body>
		<!-- if javascript is disabled -->
		<noscript>
			<div style='posistion:fixed;top:0;bottom:0;left:0;right:0;background-color:white;'> Javascript is disabled</div>
		</noscript>
		<h1>
			Registeration Form
		</h1>
		<!-- register form -->
		<!-- table contains form -->
		<form id="register-form" enctype="multipart/form-data" method="post"> 
			<table>
				<tr>
					<th> 
						Name <span class="mandatory">*</span> 
					</th>
					<td>
						<input type='text' name='name' placeholder='Enter your name' class='mandatory-fields'/>
					</td>
				</tr>
				<tr>
					<th> 
						Email <span class="mandatory">*</span> 
					</th>
					<td>
						<input type='email' name='email' placeholder='Enter your email' class='mandatory-fields'/>
					</td>
				</tr>	
				<tr>
					<th> 
						Password <span class="mandatory">*</span> 
					</th>
					<td>
						<input type='password' name='password'  id='password' class='mandatory-fields'/>
					</td>
				</tr>	
				<tr>
					<th> 
						Confirm Password <span class="mandatory">*</span> 
					</th>
					<td>
						<input type='password' name='confirm-password' id='confirm-password' class='mandatory-fields'/>
					</td>
				</tr>		
				<tr>
					<th> 
						Address <span class="mandatory">*</span> 
					</th>
					<td>
						<textarea  name='address' class='mandatory-fields'></textarea>
					</td>
				</tr>
				<tr>
					<th> 
						Mobile <span class="mandatory">*</span> 
					</th>
					<td>
						<input type='text' name='mobile' placeholder='ex: 9916330551' class='mandatory-fields'/>
					</td>
				</tr>
				<tr>
					<th> 
						Landline
					</th>
					<td>
						<input type='text' name='landline' placeholder='Enter your landline number' />
					</td>
				</tr>
				<tr>
					<th> 
						Your Photo 
					</th>
					<td>
						<input type='file' name='user-photo'  />
					</td>
				</tr>
				<tr>
					<th> 
						Logo <span class="mandatory">*</span> 
					</th>
					<td>
						<input type='file' name='logo'  class='mandatory-fields'/>
					</td>
				</tr>
				<tr>
					<th> 
						Licence Aggrement<span class="mandatory">*</span> 
					</th>
					<td>
						<input type='checkbox' name='licence-aggrement'  id='licence-aggrement' value="1"  />
						<a href='#' targe='_blank'> Read </a>
					</td>
				</tr>
				<tr>
					<th> </th>
					<td>
						<input type='button' name='sub-reg-form' id='sub-reg-form' value='Register' />
						<input type='hidden' name='action' value='register' />
					</td>
				</tr>
				<tr>
					<th colspan="2">
						<div id="register-message">
							
						</div>
					</th>
				</tr>
			</table>
		</form>

		<!-- jquery file 1.10.2.js -->
		<script type="text/javascript" src="../libraries/jquery-1.10.2.js"></script>
		<!-- internal javascript goes here -->
		<script type="text/javascript">
			$(document).ready(function () {
				//global to this function
				var _d=document, _b=$('body');

				//on click of submit
				_b.on('click', '#sub-reg-form', function() {
					var t = $(this);
					t.val('Please wait!');
					t.attr('id', 'please-wait');
					//first validate mandatory fields
					var validateFlag=true,t;
					//loop each field and check for empty field
					$('.mandatory-fields').each(function() {
						t=$(this);
						if(t.val().trim() == '') {
							t.addClass('missing');
							validateFlag=false;
						} else {
							t.removeClass('missing');
						}					
					});

					//check for validation status
					if(validateFlag === false) {
						alert('Some mandatory fields are missing');
						return;
					}

					//check for password match
					var pwd = $('#password').val().trim(), cpwd = $('#confirm-password').val().trim();
					if(pwd !== cpwd) {
						alert('Password did not match with confirm password. Please correct it!');
						return;
					}
					//check for password length
					if(pwd.length < 6) {
						alert('Password length should be atleast 6 character!');
						return;
					}

					//now validate licence aggrement, this is a super mandatory field
					var licence = $('#licence-aggrement').prop('checked');
					if(licence === false) {
						alert('You have not accepted the licence aggrement!');
						return;
					}

					//trigger the form
					$('#register-form').trigger('submit');

				});
					
				//submit the form data
				$('#register-form').submit(function(event) {

					//disable the default form submission
  					event.preventDefault();

					 var formData = new FormData($(this)[0]);
					 var msg = $('#register-message'), submitBtn = $('#sub-reg-form');	
					//now submit the data
					$.ajax(
						{
							url: '../php_scripts/actions.php',
							type: 'POST',
							dataType: 'JSON',
						    contentType: false,
						    processData: false,
							data: formData,
							success: function(data) {
								msg.text(data['message']);
								submitBtn.val('Register').attr('id', 'sub-reg-form');
							},
							error: function(response) {
								msg.text('Please try again. internal error occured');
								submitBtn.val('Register').attr('id', 'sub-reg-form');
							}
						}
					);
				});	
						
				return false;
			});
		</script>
	</body>
</html>