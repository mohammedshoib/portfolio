<?php 
	/* 
		* this will return all results by company name
	*/
	class fullResultsOfSearchItem {
		private $companyName, $prodName, $prodType;
		
		public function __construct() {
			$this->companyName = mysql_real_escape_string($_POST['b']);
			$this->prodName = mysql_real_escape_string($_POST['n']);
			$this->prodType = mysql_real_escape_string($_POST['typ']);
		}

		public function getProducts() {
			$query = "select p.price, p.image,p.description,p.stock,p.name,p.product_id,p.product_rating, pt.product_type ";
			$query .= " from products as p left join product_type as pt on p.type_id=pt.type_id where pt.product_type='$this->prodType' and p.company_name like '%$this->companyName%' order by p.create_time desc limit 0, 20 ";
			
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