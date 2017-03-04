<?php
	
	/*
		* Aim
			This gets the product description
		* Params
			porduct id
	*/
	class productDescription
	{
		var $prodId;

		public function __construct()
		{
			$prodId = isset($_POST['prodId'])?$_POST['prodId']:0;
			$this->prodId = mysql_real_escape_string($prodId);
		}

		public function getProductDescription() {
			$array = $this->retrieveProductDescription();

			return $array;
		}

		public function retrieveProductDescription() {
			$query = "select ot.active_for, ot.updated, p.product_id, p.name, p.price, p.description, p.discount, p.stock, p.product_rating, p.specs, pt.product_type, pt.product_type_rating, c.categorie_name, c.location, c.shop_name, c.shop_rating, ot.name as owner_name, ot.owner_location, p.image ";
			$query .= " from products as p left join product_type as pt on p.type_id=pt.type_id left join categorie as c on pt.categorie_id=c.categorie_id  left join owner_table as ot on c.owner_id=ot.owner_id where p.product_id='$this->prodId' and p.flag=1 and ";
			$query .= " pt.availability=1 and c.availability=1";
			
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