<?php
	
	/*
		* Aim
			This will return all products matching its type. ex: all products returned of type computer
			Fetched from products table and joined to product_type table
		* Params
			type is accepted via post
	*/
	class getProductsOfType
	{
		var $type;

		public function __construct()
		{
			$this->type = mysql_real_escape_string($_POST['type']);
		}

		public function retrieveProducts() {
			$query = "select p.price, p.image,p.description,p.stock,p.name,p.product_id,p.product_rating, p.discount, pt.product_type ";
			$query .= " from products as p left join product_type as pt on p.type_id=pt.type_id where pt.product_type='$this->type' order by p.create_time desc limit 0, 20 ";
			
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

?>