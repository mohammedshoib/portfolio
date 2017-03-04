<?php 
/*
* This will return submenus of each menus
*/
class Submenus 
{
	public function returnSubmenus() {
		//query
			$query = "select categorie_name, categorie_id from categorie";
			$result = returnQueryResult($query);
			//map by type
			$categories = array();
			//for each type query to db and get latest 5 records
			while(($row  = mysql_fetch_object($result)) !== false) {
				$categorieid  = $row->categorie_id;
				$name    = $row->categorie_name;
				
				//initialize
				$categories[$name] = array();
				//now query to qet latest five records of this id
				$query = "select product_type, type_id from product_type where categorie_id=$categorieid group by product_type";
				$producttype = returnQueryResult($query);
				while(($set=mysql_fetch_object($producttype)) !== false ) {
					$typename = $set->product_type;
					$typeid   = $set->type_id;
					$categories[$name][$typename] = array();
					//now get the products of particular type
					$query   = "select product_id, name from products where type_id=$typeid";;
					$subsets = returnQueryResult($query);

					//store each product in particular type array
					while(($subset = mysql_fetch_object($subsets)) !== false) {
						$product = array();
						$pid = $subset->product_id;
						$pn  = $subset->name;
						$product['prodid'] = $pid;
						$product['name']   = $pn;
						//now add to type array
						array_push($categories[$name][$typename], $product);
					}

				}
				
			}

			return $categories; //now return the array
	}
}
?>