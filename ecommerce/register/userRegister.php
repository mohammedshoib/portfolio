<?php 
	/** 
		* this will register the form, with flag=1, means confirmation is await. see db comment for more info
		* returns json, with proper message
		* post params are expected
	*/

		class userRegister
		{
			private $name, $email, $password, $cpassword, $addr, $mobile, $landline, $yourPhoto, $logo, $licence;
			private $crypPwd, $token, $logoPath, $photoPath, $logoName, $photoName, $dir;
			public $response = array('status'=>1,'message'=>'Confirmation mail sent to your email id!');

			public function __construct()
			{
				$this->name 	 = validateString($_POST['name']);
				$this->email 	 = validateString($_POST['email']);
				$this->token     = md5($this->email);
				$this->password  = validateString($_POST['password']);
				$this->crypPwd   = md5($this->password);
				$this->cpassword = validateString($_POST['confirm-password']);
				$this->addr 	 = validateString($_POST['address']);
				$this->mobile	 = validateString($_POST['mobile']);
				$this->landline  = validateString($_POST['landline']);
				$this->yourPhoto = $_FILES['user-photo'];
				$this->logo 	 = $_FILES['logo'];
				$this->licence   = validateString($_POST['licence-aggrement']);
				$this->logoName  = $this->returnUniqueFileName($this->logo['name']);
				$this->photoName = $this->returnUniqueFileName($this->yourPhoto['name']);
				$this->dir 		 = "../registered_users/$this->email";
				$this->logoPath  = "../registered_users/$this->email/$this->logoName";
				$this->photoPath = "../registered_users/$this->email/$this->photoName";
			}

			/** 
			* validate mandatory fields
			* validate password
			* validate licence field
			*/
			public function validateFormData() {
				
				//code to check mandatory fields
				if($this->name == '' || $this->email=='' || $this->password=='' || $this->cpassword==''|| $this->addr=='' || $this->mobile=='' || $this->licence != '1' || $this->logo['size'] == 0) {
					$this->response['status']  = 0;
					$this->response['message'] = 'Mandatory fields are missing';
					return false;
				}

				//code to check password
				if($this->password != $this->cpassword) {
					$this->response['status']  = 0;
					$this->response['message'] = 'Password did not match confirm password';
					return false;	
				}
				if(strlen($this->password) < 6) {
					$this->response['status']  = 0;
					$this->response['message'] = 'Password length must be greater or equal to 6 characters';
					return false;	
				}

				//else return true
				return true;

			}

			//now insert data into register table
			public function registerUser() {
				//check for email id existence
				$userExistence = $this->checkUserExistence();
				if(!$userExistence) {
					$this->response['status']  = 0;
					$this->response['message'] = 'Email id already exists. Please try different email id!';
					return false;					
				}

				$sql = "insert into register(name, email, password, orig_password, address, mobile, landline, logo, photo, licence_aggrement,token, create_time) ";
				$sql .= " values('$this->name', '$this->email', '$this->crypPwd', '$this->password', '$this->addr', '$this->mobile', '$this->landline', '$this->logoPath', '$this->photoPath', $this->licence, '$this->token', NOW())";
				
				//store it in db now
				$result = returnQueryResult($sql);
				if($result == false) {
					$this->response['status']  = 0;
					$this->response['message'] = 'Sorry! Something went wrong. Try Again';
					return;
				}

				//create user directory
				$dir = "../registered_users/$this->email";
				mkdir($dir, 0777, true);
				chmod($dir, 0777);

				//now move files to user directory
				move_uploaded_file($this->logo['tmp_name'], $this->logoPath); //logo
				move_uploaded_file($this->yourPhoto['tmp_name'], $this->photoPath); //your photo

				//now send confirmation mail to user
				$this->sendConfirmationMail();
			}

			//return unique file name
			private function returnUniqueFileName($name) {
				while(file_exists($this->dir.'/'.$name) == true) {
					$name = rand(1000).$name;
				}
				return $name;
			}

			//this will send the confirmation mail to user with link to activate, it sends the token as unique identifier
			private function sendConfirmationMail() {
				$subject  = 'Confirmation Mail';
				$from     = 'mohammedshoib@momeen.com';
				$replyTo  = 'no-reply@momeen.com';
				
				//include some fancy stuff here, token is md5 of email
				$message  = "<a href='http://www.momeen.com/eCommerce/register/confirmUser.php?token=$this->token'> Confirm</a>";

				$headers  = "From: "."$from"."\r\n";
				$headers .= "Reply-To: "."$replyTo"."\r\n";
				$headers .= "MIME-Version:1.0\r\n";
				$headers .= "Content-Type:text/html; charset=ISO-8859-1\r\n";
				if(!mail($this->email, $subject, $message, $headers)) {
					$this->response['status']  = 0;
					$this->response['message'] = 'Confirmation mail did not sent. Contact admin';
				}
			}

			//check user id already exists
			private function checkUserExistence() {
				$query = "select count(email) as count from register where email='$this->email'";
				$resource = returnQueryResult($query);
				$result = mysql_fetch_assoc($resource);
				if($result['count'] > 0) {
					return false;
				}
				return true;
			}
		}
?>