//on document ready perform jquery operations
$(document).ready(function() {
	var _d=document, _b=$('body');

	//show to homepage promos
	showHomePageProducts();

	//on hover of item show corresponding description
	_b.on('click', '.item', function() {
		var t = $(this);
		// t.children('.item-details').addClass('show-desc');
		t.children('.item-details').addClass('show-desc').animate(
		{
			marginTop: '2',
		}, 300, "linear"
		);
	});
	_b.on('click', '.item-details', function(e) {
		//stop event bubbling
		e.stopPropagation();
		var t = $(this);
		// t.children('.item-details').removeClass('show-desc');
		t.removeClass('show-desc').animate(
		{
			marginTop: '190',
		}, 300, "linear"
		);
	});

	//navigation hover
	_b.on('mouseover', '.navigation', function() {
		var t = $(this), id = t.attr('id'), subMenu;

		if(id == 'home') {
			t.addClass('home-enter');
		} else {
			t.addClass('navigation-hover');
			subMenu = t.children('.sub-menu-list'); 
			subMenu.addClass('sub-menu-list-hover');
			if(!subMenu.hasClass('fetched')) {
				var c, itemCont, li, subItems = submenusObj[id], tbl;
				if(subItems) {
					var tr= $('<tr></tr>'),td; //dom fragment
					$.each(subItems, function(title,items) {
						td = $('<td  class="sub-menu-tbl"></td>');
						c = $('<div class="sub-menu-container"></div>');
						//add bottom design for sub menu pop up
						c.append('<div class="sub-menu-btm-design"></div>');
						c.append('<h2 class="sub-menu-title" name="'+title+'">'+title+'</h2>');
						//now add product items
						itemCont = $('<ul class="item-containter"></ul>');
						$.each(items, function(k, item) {
							li = $('<li></li>');
							li.attr('id', item['prodId']).addClass('sub-menu-item').text(item['name']);
							itemCont.append(li);
						});
						//add item container to main container
						c.append(itemCont);
						td.append(c);
						tr.append(td);
					});
					//add to table
					var tbl = $('<table></table>');
					tbl.append(tr);
					//now add to dom and
					//now add the class fetched means, no need to extract again from json
					subMenu.append(tbl).addClass('fetched');		
				}		
			}
		}		

	});
	_b.on('mouseout', '.navigation', function() {
		var t = $(this), id = t.attr('id');
		if(id == 'home') {
			t.removeClass('home-enter');
		} else {
			t.removeClass('navigation-hover');
			t.children('.sub-menu-list').removeClass('sub-menu-list-hover');	
		}		
	});
	

	//show description of product here
	_b.on('click', '.full-desc', function(e) {
		//preven event bubbling
		e.stopPropagation();
		//show loading
		showLoading();

		var t=$(this), prodId=t.attr('id');
		//first show the container with loading symbol
		var c = '<div id="pop-up-cont"><div id="close-pop-up-cont"></div></div>';
		//first hide the prod container
		$('#item-container').css('display','none');
		//add to item container container
		$('#body').prepend(c);

		//show full description
		showProductDescription(prodId);
		
	});

	//show description of product here
	_b.on('click', '.cart-view-full-desc', function() {

		//show loading
		showLoading();

		//check if already pop up is showing, if so then remove it
		removePopUpIf();

		var t=$(this), prodId=t.attr('id');
		//first show the container with loading symbol
		var c = '<div id="pop-up-cont"><div id="close-pop-up-cont"></div></div>';
		//first hide the prod container
		$('#item-container').css('display','none');
		//add to item container container
		$('#body').prepend(c);

		//show full description
		showProductDescription(prodId);
		
	});

	//remove description of product container and elements from dom
	_b.on('click', '#close-pop-up-cont', function() {
		$('#pop-up-cont').remove();
		$('#item-container').css('display','block');
		$('#body').css('minHeight','100px');

		//remove class actv if
		var viewCart = $('#view-cart');
		if(viewCart.hasClass('extra-btn-actv')) {
			viewCart.removeClass('extra-btn-actv');
		}

		//close loading
		closeLoading();
	});

	//show the all products, using product type
	_b.on('click', '.sub-menu-title', function(e) {
		e.stopPropagation();
		
		//show loading
		showLoading();

		var t=$(this),name=t.attr('name');
		// ic.html('');
		showProducts(name);
	});

	//show the product description, on click
	_b.on('click', '.sub-menu-item', function(e) {
		e.stopPropagation();
		
		//show loading
		showLoading();

		var t=$(this),prodId=t.attr('id');
		
		//first show the container with loading symbol
		var c = '<div id="pop-up-cont"><div id="close-pop-up-cont"></div></div>';
		//first hide the prod container
		$('.product-type').css('display','none');
		//add to item container container
		$('#item-container').prepend(c);
		
		showProductDescription(prodId);
	});

	//show categories
	var _dontsTab = ['home'];
	_b.on('click', '.navigation', function() {		
		//show loading
		showLoading();
		var t=$(this),categorie=t.attr('id');
		
		//first remove active tab from all the tabs
		$('.navigation').removeClass('navigation-tab-act');

		//if it is home tab clicked then no need to go to db and fetch
		//instead get from json file
		if($.inArray(categorie, _dontsTab) != -1) {
			//get all product of type of categorie
			showHomePageProducts();
			return;
		}

		//now add to current clicked tab
		t.addClass('navigation-tab-act');

		//get all product of type of categorie
		showProductsOfCategorie(categorie, '', '');
	});

	//show categories
	_b.on('click', '.categories-list', function() {
		//show loading
		showLoading();
		var t=$(this),productType=t.attr('id');		
		//get all product of type of categorie
		showProducts(productType);
	});

	//get categories of particular area
	_b.on('change', '.categorie-select', function() {
		//show loading
		showLoading();
		
		var shop = $('#shop-name').val(), loc = $('#select-location').val();
		var categorie = $('#choosenCategorie').val();
		showProductsOfCategorie(categorie, loc, shop, true);
	});

	//add to cart
	_b.on('click', '.buy', function(e) {
		//preven event bubbling
		e.stopPropagation();

		var t=$(this), pid=t.attr('id');
		//dont allow multiple clicks at a time
		if(t.hasClass('adding-to-cart')){
			return;
		}
		t.addClass('adding-to-cart');
		//add to cart
		addToCart(pid, t);
	});

	//increase quantity by 1
	//add to cart
	_b.on('click', '.increase-item-qty', function() {
		var t=$(this), pid=t.attr('data-id');
		//dont allow multiple clicks at a time
		if(t.hasClass('qty-inc')){
			return;
		}
		//add class
		t.addClass('qty-inc');
		//add to cart
		addToCart(pid, t, 'cart');
	});

	//view cart
	_b.on('click', '#view-cart', function() {
		var t=$(this), ic=$('#item-container'), bdy = $('#body');
		//add class active
		t.addClass('extra-btn-actv');

		//check if already pop up is showing, if so then remove it
		removePopUpIf();

		var c = '<div id="pop-up-cont"><div class="cart-items-cont"><div id="cart-items"><div id="cart-header"><span id="cart-title">YOUR CART ITEMS!</span></div></div></div><div id="close-pop-up-cont"></div></div>';
		//hide the container first
		ic.css('display', 'none');
		//add container to dom
		bdy.css('minHeight','100px').prepend(c);

		//first show loading
		showLoading();
		//show cart
		showCart(); 
	});

	//show login
	_b.on('click', '#user-login', function() {
		var form = $('#login-form-cont');
		//add class active
		var t=$(this);
		t.addClass('extra-btn-actv');
		
		if(form.length > 0) {
			form.css({'display':'block'});
			return;
		}


		//else create form for first time
		var c = $('<div id="login-form-cont" style="display:block;"></div>'), tbl=$('<table></table>'), tr,td, lbl, inp;
		$.each(html_str_json['loginForm'], function(k,v) {
			tr = $('<tr></tr>');
			tr.append(v); //add to tr
			if(k == 'forgot-pwd') {
				tr.addClass('forgot-password-row');
			} else {
				tr.addClass('login-form-row');
			}
			tbl.append(tr); //add to tbl
		});
		//add tbl to cont
		c.append(tbl);
		//add close btn
		c.prepend('<span id="login-form-close">X</span>');
		//add cont to dom
		$('#extra-btns-cont').append(c);
	});

	//close login form
	_b.on('click', '#login-form-close', function() {
		var form = $('#login-form-cont');
		form.css('display', 'none');

		//remove active class from login btn
		$('#user-login').removeClass('extra-btn-actv');
	});

	//remove element from cart
	_b.on('click', '.remove-cart-item', function() {
		var t =$(this), prodId=t.attr('id'), qtyEle=$('#qty-'+prodId), qty=qtyEle.children('.cart-item-quantity').text();
			
		//add class removing
		if(t.hasClass('item-removing')){
			return;
		}
		t.addClass('item-removing');

		//remove an element from server
		removeItemFromCart(prodId, parseInt(qty), qtyEle, t);

	});

	//search field
	//global timer for searching
	var _searchTimer, _searchTime= new Date().getTime();
	var _validSearchKeyCodes = [8,13,32,46];
	_b.on('keyup', '#search-field', function(e) {
		//32=space, 8=back space, 46=delete, 30-40=nav, 13=enter
		var keyCode = e.which, t=$(this),search=t.val().trim(); 
		// console.log(keyCode);
		//if not valid the keycode then return
		if( ($.inArray(keyCode, _validSearchKeyCodes) == -1 
					 && !(keyCode>=65&&keyCode<=90) &&
			 		!(keyCode>=48&&keyCode<=57) ) ||
			 		search.length === 0 )
			{
			return;
		}
		//else get the results

		//shoib: applied logic for stopping continues trigers of ajax.
		//half a second is the minimu gap between each ajax call
		var currentTime = new Date().getTime();
		if((currentTime-_searchTime) < 500 ) {
			clearTimeout(_searchTimer);
		}
		_searchTime = new Date().getTime();
		_searchTimer = setTimeout(function() {
			showResults(search);	
		}, 500);		

	});

	//on blur remove search results
	_b.on('blur', '#search-field', function(e) { 
		var cont = $('#search-result-cont');
		setTimeout(function() {
			if(cont.length > 0) {
				cont.remove();
			}	
		}, 500);		
	});

	//on focus show results if text exists
	_b.on('focus', '#search-field', function(e) { 
		var t=$(this),search=t.val().trim(); 
		if(search.length > 0) {
			showResults(search);
		}
	});	

	//on focus show results if text exists
	_b.on('click', '#search', function(e) { 
		var txtFld=$('#search-field'),search=txtFld.val().trim(); 
		if(search.length > 0) {
			showResults(search);
		}
	});	

	//show results of found search
	_b.on('mousedown', '.search-result', function() {
		var t=$(this), txt=t.text(), categorie=t.attr('type'), prodId =	t.attr('id'), brand=t.attr('brand');
		//add to search field
		$('#search-field').val(txt);

		//show loading
		showLoading();
		
		//here show results to user
		showResultsForSearchItem(categorie, txt, prodId, brand);
	});

	//change color on hover
	_b.on('mouseover', '.search-result', function() {
		var t=$(this);
		t.addClass('search-result-hover');
	});
	_b.on('mouseout', '.search-result', function() {
		var t=$(this);
		t.removeClass('search-result-hover');
	});


	//onclick of operation finish message, remove it
	_b.on('click', '.user-msg-cont', function() {
		var t=$(this);
		// t.css('opacity', '0');
		t.remove();
	});

	//show details for forgot password
	_b.on('click', '#forgot-pwd', function() {
		//hide other form elements
		$('.login-form-row').css('display', 'none');
		$('.forgot-password-row').css('display', 'block');
	});

	//show details for login
	_b.on('click', '#forgot-pwd-close', function() {
		//hide other form elements
		$('.forgot-password-row').css('display', 'none');
		$('.login-form-row').css('display', 'block');
	});

	//send password to email
	_b.on('click', '#forgot-pwd-btn', function() {
		var fld = $('#forgot-pwd-fld'), emailId = fld.val(), minimize=$('#forgot-pwd-close');
		fld.val('Please wait...');
		minimize.val('-');

		//send password to user
		sendPasswordToUser(fld, emailId, minimize);
	});



	/*-end of document ready-*/
});

/* 
	* this is for development message, once done remove this message
*/
(function() {
	var str = '<div class="under-development"><h1>The site is under development!</h1>';
		str += '<span>You can contact me at: +91 - 9916330551, Email: mohammedshoib@gmail.com </span></div>';

	//add this element to container
	$('#container').append(str);
})();