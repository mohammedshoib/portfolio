<?php 
	
	/**
	* It adds to cart
	*/
	class cart extends productDescription
	{
		var $uid, $cart;

		public function createSession() {
			if(isset($_SESSION['ses_id']) && (count($_SESSION['ses_id']) != 0)) {
				$this->sid = $_SESSION['ses_id'];
				$this->cart = $_SESSION[$this->sid];

			} else {
				$this->sid = $this->createSessionId();
				$_SESSION['ses_id'] = $this->sid;
				$this->cart = array();
				$_SESSION[$this->sid] = array();
			}
		}

		private function createSessionId() {
			$id = 'ses'. rand(0,5000).rand(5001, 10000);
			return $id;
		}

		

		public function updateCart() {
			
			//check for product existence
			//if so then increase the quantity
			$cnt = count($this->cart);
			$product_exist = false;
			for($i=0; $i<$cnt; $i++) {
				$item = $this->cart[$i][0];
				$exiting_prod_id = $item['product_id'];
				if($exiting_prod_id == $this->prodId) {
					$product_exist = true;
					$qty = $item['quantity'];
					//update quantity
					$this->cart[$i][0]['quantity'] = $qty + 1;
				} 
			}

			//if product doesn't exist then fetch desc from
			//db and add it to cart
			if($product_exist == false) {
				$result = $this->retrieveProductDescription();
				if(count($result) == 0) {
					return;
				}	
				//add quantity array to result
				$result[0]['quantity'] = 1;
				//add result to cart		
				array_push($this->cart, $result);
			}

			//store cart in session
			$_SESSION[$this->sid] = $this->cart;
		}

		public function getItems() {
			$sesid = $_SESSION['ses_id'];
			$items = $_SESSION[$sesid];

			return $items;
		}

		//remove element from cart
		public function removeElementFromCart() {
			$cnt = count($this->cart);
			for($i=0; $i<$cnt; $i++) {
				$item = $this->cart[$i][0];
				$exiting_prod_id = $item['product_id'];
				if($exiting_prod_id == $this->prodId) {
					$qty = $item['quantity'];
					if($qty > 1) {
						$this->cart[$i][0]['quantity'] = $qty - 1;
					} else {
						//remove an item from array
						unset($this->cart[$i]);
					}					
				}  
			}
			
			//store cart in session
			$_SESSION[$this->sid] = $this->cart;

			//return success message
			echo json_encode(array('success'));
		}

	}
	
?>
