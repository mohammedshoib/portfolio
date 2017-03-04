<?php 
/* 
* this class will return the products to show on home page, only 25 different products are fetched.
*/
	class getHomePageProducts {
		
		public function fetchProducts() {
			//query
			$query = "select product_type, type_id from product_type group by product_type limit 5";
			$result = returnQueryResult($query);
			//map by type
			$types = array();
			//for each type query to db and get latest 5 records
			while(($row  = mysql_fetch_object($result)) !== false) {
				$typeid  = $row->type_id;
				$name    = $row->product_type;
				
				//initialize
				$types[$name] = array();
				//now query to qet latest five records of this id
				$query = "select * from products where type_id=$typeid limit 5";
				$subsets = returnQueryResult($query);
				while(($set=mysql_fetch_object($subsets)) !== false ) {
					$data = array();
					$data['url'] = $set->image; 
					$data['desc'] = $set->description;
					$data['rating'] = $set->product_rating;
					$data['prodid'] = $set->product_id;
					$data['name'] = $set->name;
					$data['price'] = $set->price;
					$data['best'] =  explode(',', '41mp, High zoom, Long battery life');
					$data['discount'] = $set->discount;
					//now push above array to types array
					array_push($types[$name], $data);
				}
			}

			return $types; //now return the array
		}

	}
?>