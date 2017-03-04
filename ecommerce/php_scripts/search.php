<?php 
 /* 
	Aim: Get the  proper result for a key frame

	Algo:
		1 string should be words ex: lenovo z580
		2 split each words from string
		3 perform search for each word
		4 take the matching results from each arr
		5 if step 4 produces zero results, then take the array which contains max results
		6 else take matching records from all arrays
		7 return max 5 results
 */

		class search {
			var $words=array(), $search;
			
			public function __construct() {
				$this->search = mysql_real_escape_string($_POST['search']);
				//get final search words, is array
				$this->words  = $this->returnFinalWords();
			}

			/* 
				* this will return words, later return corrected words
			*/
			private function returnFinalWords() {
				$words = explode(' ', $this->search);
				return $words;
			}

			/* 
				* return the search results
			*/
			public function returnSearchResults() {
				
				$count = count($this->words);

				//if count of words is less then return it
				if($count == 0) {
					return $this->words;
				}

				//fetch to db for each word, and store in array
				$results =  array();
				for($i=0; $i<$count; $i++ ) {
					$query = "select p.product_id, p.name, p.price, p.product_rating, pt.product_type, p.company_name ";
					$query .= " from products as p left join product_type as pt on p.type_id=pt.type_id where p.name like '%".$this->words[$i]."%' or pt.product_type like '".$this->words[$i]."' and p.flag=1 and pt.availability=1";

					//fetch the results
					$result = returnQueryResult($query);
					$array = array();
					while(($row = mysql_fetch_assoc($result)) != false) {
						array_push( $array,$row );
					}
					if(count($array)>0) {
						//now add the array to results array
						array_push($results,$array);					
					}

				}
				//now take the common elements from all posibilities of arr
				$resCnt = count($results);
				//return if result count is null
				if($resCnt == 0) {
					return $this->words;
				}
				//now compare each array with other array and get 
				//matched key from each
				$macthedResults = array();
				$prodIds = array();
				for($i=0; $i<$resCnt; $i++) {
					for($x=$i+1; $x<$resCnt; $x++) {						
						$prevRes = $results[$i][0];
						$nxtRes  = $results[$x][0];

						// $uniquArr = array_intersect(
						// 	$results[$i][0], 
						// 	$results[$x][0]
						// );
						// print_r($uniquArr);

						//comparing prev arr with next arr and taking 
						//unique array
						$prevProdId = $prevRes['product_id'];
						$nxtProdId  = $nxtRes['product_id'];
						if($prevProdId != $nxtProdId) {
							if(!in_array($prevProdId, $prodIds) ) {
								array_push($macthedResults, $prevRes);	
								array_push($prodIds, $prevProdId);
							}
							if(!in_array($nxtProdId, $prodIds) ) {
								array_push($macthedResults, $nxtRes);	
								array_push($prodIds, $nxtProdId);
							}	
						}
												
					}
				}
				//check whether any results found
				$macthedResultsCnt = count($macthedResults);
				if($macthedResultsCnt == 0) {
					//then take max of array
					array_push($macthedResults, max($results[0]));
				}


				return $macthedResults;

			}	

		}

?>