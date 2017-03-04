<?php	
	/*
		* Aim
			This will return all products matching its categorie. ex: all products returned of type electronics
			Fetched from products table and joined to product_type table
		* Params
			categorie is accepted via post
	*/
	class getProductsOfCategorie
	{
		var $categorie, $shop_name, $location;

		public function __construct()
		{
			$this->categorie =  mysql_real_escape_string($_POST['categorie']);
			$this->shop_name =  mysql_real_escape_string($_POST['shop_name']);
			$this->location  =  mysql_real_escape_string($_POST['location']);
		}

		public function retrieveProductsOfCategorie() {

			//get the stock, in all the shops of particular categorie of each product
			$query = "select sum(p.stock) as stock,pt.product_type from categorie as c left join product_type as pt on c.categorie_id = pt.categorie_id left join products as p on pt.type_id=p.type_id where c.availability=1 and pt.availability=1 and p.flag=1 and c.categorie_name='$this->categorie' and c.shop_name like '%$this->shop_name' and c.location like '%$this->location' group by pt.product_type";
			//query to db
			$result = returnQueryResult($query);
			//prepare required array of result
			$array = array();
			$i=0;
			while(($row = mysql_fetch_assoc($result)) != false) {
				$array[$i] = $row;
				$i++;
			}
			
			//get locations and shop names of particualar categorie
			$query = "select location, shop_name from categorie where categorie_name='$this->categorie' and availability=1 ";
			//query to db
			$result1 = returnQueryResult($query);

			$locations = array();
			$shop_names = array();
			//read each row 
			while(($row = mysql_fetch_assoc($result1)) != false) { 
				$name = $row['shop_name'];
				$loc  = $row['location'];
				if(!in_array($name, $shop_names)) {
					array_push($shop_names, $name);	
				}
				if(!in_array($loc, $locations)) {
					array_push($locations, $loc);
				}
			}

			//this is the final array sent in response
			$result = array();
			$result['categories'] = $array;
			$result['locations'] = $locations;
			$result['shop_names'] = $shop_names;

		  	return $result;

		}
	}

?>