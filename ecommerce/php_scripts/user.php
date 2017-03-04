<?php 
	/* 
		* this will perform all the operation required to user
		* like, showing his/her products, modifying, deleting etc
	*/
		//include functions file here
		require('../php_scripts/functions.php');
		//include connection file
		require('../php_scripts/connect.php');
		
		class user {
			
			private $email, $start, $end;

			//set necessary details
			public function __construct() {
				$this->email = 'mohammedshoib@momeen.com'; //$_SESSION['email'];
				$this->start = 0; //$_SESSION['start'];
				$this->end   = 12; //$_SESSION['end'];
			}

			public function getProducts() {
				$query = "select p.viewed, ot.active_for, ot.updated, p.product_id, p.name, p.price, p.description, p.discount, p.stock, p.product_rating, p.specs, pt.product_type, pt.product_type_rating, c.categorie_name, c.location, c.shop_name, c.shop_rating, ot.name as owner_name, ot.owner_location, p.image ";
				$query .= " from products as p left join product_type as pt on p.type_id=pt.type_id left join categorie as c on pt.categorie_id=c.categorie_id  left join owner_table as ot on c.owner_id=ot.owner_id where ot.email='$this->email' order by p.viewed desc limit $this->start, $this->end";
				
				//query to db
				$result = returnQueryResult($query);

				//prepare required array of result
				$array = array();
				$i=0;
				while(($row = mysql_fetch_assoc($result)) != false) {
					$array[$i] = $row;
					$i++;
				}

				return $array;
			}
		}

		//get the action to be performed
		$case = isset($_POST['action'])?stripslashes($_POST['action']):'';
		

		//now perform the actuall task
		switch ($case) {
			case 'onload':
				$user = new user();
				$products = $user->getProducts();
				echo json_encode($products);
				break;
			
			default:
				echo json_encode(array('Invalid call!'));
				break;
		}
?>