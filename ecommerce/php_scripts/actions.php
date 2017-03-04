<?php 
	
	//check if file being hit by its origin only, else block it
	// $url = $_SERVER['HTTP_HOST'];
	// if($url == 'localhost', )
	// exit;

	session_start();

	//include configuration file
	require_once('config.php');
	//include connection file
	require_once('connect.php');
	//include common functions
	require_once('functions.php');

	//get the action
	$act = isset($_POST['action'])?mysql_real_escape_string($_POST['action']):'';

	switch ($act) {
		case 'cart':
			require_once('getProductDescription.php');
			require_once('cart.php');
			$cart=new cart();
			$cart->createSession();
			// $prodid = mysql_real_escape_string($_POST['prodId']);
			$cart->updateCart();
			break;

		case 'prod-desc':
			require_once('getProductDescription.php');
			// $prodid = mysql_real_escape_string($_POST['prodId']);
			$prodDesc = new productDescription();
			$result   = $prodDesc->getProductDescription();
			echo json_encode($result);
			break;

		case 'show-cart':
			require_once('getProductDescription.php');
			require_once('cart.php');
			$cart = new cart();
			$cart->createSession();
			echo json_encode($cart->getItems());
			break;

		case 'remove-item-from-cart':
			require_once('getProductDescription.php');
			require_once('cart.php');
			$cart=new cart();
			$cart->createSession();
			// $prodid = mysql_real_escape_string($_POST['prodId']);
			$cart->removeElementFromCart();
			break;

		case 'search': 
			require_once('search.php');
			$search = new search();
			$result = $search->returnSearchResults();
			echo json_encode($result);
			break;

		case 'search-full-results':
			//require file
			require_once('fullResultsOfSearchItem.php');

			$fullSearchObj = new fullResultsOfSearchItem();
			$result = $fullSearchObj->getProducts();
			echo json_encode($result);
			break;

		case 'show-categories':
			require_once('getProductsOfCategorie.php');
			$categorieObj = new getProductsOfCategorie();
			$result = $categorieObj->retrieveProductsOfCategorie();
			echo json_encode($result);
			break;

		case 'show-products-of-type':
			//require file
			require_once('getProductsOfType.php');

			$products = new getProductsOfType();
			$result = $products->retrieveProducts();
			echo json_encode($result);
			break;

		case 'register': 
			//require registeration file
			require_once('userRegister.php');
			$register = new userRegister();
			$validation = $register->validateFormData();
			if($validation) {
				$register->registerUser();
			} 
			echo json_encode($register->response);			
			break;

		case 'homepage':
			//get the getHomePageProducts.php
			require_once('getHomePageProducts.php');
			$products = new getHomePageProducts();
			$set      = $products->fetchProducts();
			echo json_encode($set);
			break;

		case 'submenus':
			//get the getHomePageProducts.php
			require_once('getSubmenus.php');
			$submenus = new Submenus();
			$submenu  = $submenus->returnSubmenus();
			echo json_encode($submenu);
			break;	
		
		default:
			# code...
			break;
	}

?>