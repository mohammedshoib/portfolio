/* 
	* this will get the products from db, future release: later get it from json
	* takes product name
*/
function showProducts (prodType) {
	//make an ajax call getProductsOfType.php
	$.ajax(
		{
			url: 'php_scripts/actions.php',
			type: 'POST',
			dataType: 'JSON',
			data: 'action=show-products-of-type&type='+prodType,
			success:function(data) {
				// data = JSON.parse(data);
				// console.log(typeof data);
				appendProductsToDom(data, prodType);
			},
			error: function(response) {
				//log error
				jsLogError('');
				shortTimeMesg('Alert! No product found. Try Again!', 'short-time-msg-failure');
			},
		}
	);
}

/* 
	* conver json to html and add to dom
*/
function appendProductsToDom(result, prodName) {
	var htmlStr, c=$('<div class="product-type"></div>'), name=$('<div class="product-type-name"></div>'), discount;
	//add name
	name.text(prodName);
	//add to container
	c.append(name); 

	//loop through each product and add details
	$.each(result, function(k,v) {

		htmlStr = '<div class="item" url="'+v['image']+'"><div class="item-details">';
		htmlStr += '<h1 class="item-name">'+v['name']+'</h1><p class="item-desc">'+v['description']+'</p><div class="line-break"></div>';
		htmlStr += '<span class="item-price">'+v['price']+' </span>';
		htmlStr += '<span class="item-rating">'+v['product_rating']+'</span><div class="line-break"></div>';
		htmlStr += '<div class="item-btn-container"><input type="button" value="View" class="full-desc theme-btn" id="'+v['product_id']+'"/><input type="button" value="BUY !" class="buy theme-btn" id="'+v['product_id']+'"/> </div>';
		htmlStr += '</div>';
		//add offer if available
		discount = v['discount'];
		if(discount != 0 && discount !== undefined) {
			htmlStr += '<div class="discount" title="'+discount+'% available"><span>'+discount+'%</span></div></div>';
		} else {
			htmlStr += '</div>';
		}

		// add to container
		c.append(htmlStr);
	});

	//now finally add to dom
	$('#item-container').html(c);
	//once added to dom, load images
	$('.item').each(function() {
		var t = $(this), url = t.attr('url');
		t.css('backgroundImage', 'url("'+url+'")');
	});

	//show loading
	closeLoading();
}

/*
	* Get all products of particular categorie, ex: get all types of categorie electronics
*/
function showProductsOfCategorie(categorie, loc, shop_name, filter) {
	//make an ajax call
	$.ajax(
		{
			url: 'php_scripts/actions.php',
			type: 'POST',
			dataType: 'JSON',
			data: 'action=show-categories&categorie='+categorie+'&location='+loc+'&shop_name='+shop_name,
			success:function(data) {
				// data = JSON.parse(data);
				// console.log(typeof data);
				appendCategoriesToDom(data, categorie, filter);
			},
			error: function(response) {
				//log error
				jsLogError('');
				shortTimeMesg('Alert! No categories found. Try Again!', 'short-time-msg-failure');
			},
		}
	);
}


/* 
	* Show all products of particular categorie
*/
function appendCategoriesToDom(data, categories, filter) {

	//this usally happens when user applies filter to categories list like
	//searchin locaiton or shop name
	if(filter !== undefined) {
		var cont = $('#categories-list-tmp-cont');
		//remove previous data
		cont.children('.categories-list').remove();
		drawCategoriesResult(cont , data['categories']);
		//remove loading
		closeLoading();	
		return;
	}
	//else this will be first time then prepare complete ui here

	var ch = $('<div id="categorie-header"></div>'), cont=$('<div id="categories-list-tmp-cont"></div>');
		//add name of categorie
		ch.append('<span id="categorie-name">'+categories.toUpperCase()+'<input type="hidden" value="'+categories+'" id="choosenCategorie" /></span>');

	var loc = $('<select id="select-location" class="categorie-select"></select>');
		loc.append('<option value="">LOCATION</option>');
	var shopName = $('<select id="shop-name" class="categorie-select"></select>');
		shopName.append('<option value="">SHOP NAMES</option>');

	var opt;
	//prepare locations
	$.each(data['locations'], function(k,v) {
		opt = '<option value="'+v+'">'+v.toUpperCase()+'</option>';
		loc.append(opt);
	});
	//prepare shop names	
	$.each(data['shop_names'], function(k,v) {
		opt = '<option value="'+v+'">'+v.toUpperCase()+'</option>';
		shopName.append(opt);
	});

	// add to header
	ch.append(loc).append(shopName);
	//add to code fragment
	cont.append(ch);

	//prepare body list
	drawCategoriesResult(cont, data['categories']);	

	//now finally add to dom
	$('#item-container').html(cont);

	//remove loading
	closeLoading();

}

/* 
	* thiw draw the categories body
*/
function drawCategoriesResult(cont, cateResult) {
	//prepare body list
	var categories, eachCateName;
	$.each(cateResult, function(k, v) {
		eachCateName = v['product_type'];
		categories = '<div class="categories-list" id="'+eachCateName+'">';
			categories += '<label>Type: </label><span>'+eachCateName.toUpperCase()+'</span>';
			categories += '<label>Stock: </label><span>'+v['stock']+'</span>';
		categories += '</div>';
		//add to main container
		cont.append(categories);
	});
}


/*
	* show full description of a product
*/
function showProductDescription(prodId) {
	//make an ajax call, to get product description
	$.ajax(
		{
			url: 'php_scripts/actions.php',
			type: 'POST',
			dataType: 'JSON',
			data: 'prodId='+prodId+'&action=prod-desc',
			success:function(data) {
				// data = JSON.parse(data);
				// console.log(typeof data);
				appendProductDescription(data);
			},
			error: function(response) {
				//log error
				jsLogError('');
				shortTimeMesg('Alert! No description found. Try Again!', 'short-time-msg-failure');
			},
		}
	);
}

/* 
	* show the product description to user
*/
function appendProductDescription(result) {
	if(result.length > 0) {
		var mc=$('<div class="prod-desc-cont"></div>'), c = $('<div class="prod-desc-tbl"></div>'), pic_cont=$('<div class="prod-pic-cont"></div>');
		var pic = $('<div id="prod-pic"></div>'), tbl1 = $('<table id="prod-spec-tbl-cont"></table>'), tr,th,td, zoomPic = '<div id="zoom-pic"></div>';
		//add image to div
		pic.css('backgroundImage', 'url("'+result[0]['image']+'")');
		pic_cont.append(zoomPic).append(pic);
		//add pic to main container
		mc.append(pic_cont);

		var donts = ['active_for', 'updated', 'image'];
		$.each(result[0], function(k,v) {
			if($.inArray(k, donts) == -1) {
				tr = $('<tr></tr>');
				td = $('<td></td>');
				td.text(k.toUpperCase().replace(/_/g, ' ') );
				th = $('<th></th>');
				if(k=='specs') {
					extractSpecs(th, v);
				} else {
					th.text(v);	
				}
				
				//add to tr
				tr.append(td).append(th);
				//add tr to table
				tbl1.append(tr);
			}
		});
		//add table to main container
		c.append(tbl1);
		mc.append(c);

		//add to dom now
		var popup = $('#pop-up-cont');
		popup.append(mc);

		$('#body').css('minHeight', popup.css('height'));
	}
	//remove loading
	closeLoading();

}


/* 
	* show promo images here
*/
function showPromoImages() {
	//show all images of promos
	setTimeout(function() {
		$('.item').each(function() {
			var t = $(this), url = t.attr('url');
			t.css('backgroundImage', 'url("'+url+'")');
		});	
	}, 0);	
};

/* 
	* specs are separated by ## and again by ###
	* ### contains question and answer
	* ## contains multiple q&a
*/
function extractSpecs(obj, str) {
	var rows = str.split('#-#'), tbl = $('<table id="specs-tbl" ></table>'), rowsLen=rows.length, tr,col, colLen,th;
	for(var i=0; i<rowsLen; i++) {
		tr = $('<tr></tr>');
		col = rows[i].split('###');
		colLen = col.length;
		for(var j=0;j<colLen; j++) {
			th = '<th>'+ col[j]+'</th>';
			tr.append(th); //add to tr
		}
		//add to table
		tbl.append(tr);
	}
	//add to main obj
	obj.append(tbl);
}

/* 
	* Add to cart, details are stored in sessions
*/
function addToCart(prodId, clckEle, fromCart) {
	$.ajax(
	{
		url: 'php_scripts/actions.php',
		type: 'POST',
		data: 'prodId='+prodId+'&action=cart',
		// dataType: 'JSON',
		success: function(data) {
			//show theme success message
			shortTimeMesg('Product added to cart successfully.', 'short-time-msg-success');
			if(fromCart === undefined)  {
				clckEle.removeClass('adding-to-cart');
			} 
			else if(fromCart === 'cart') {
				//increase the item quantity from ui sid
				var qtyEle =$('#qty-'+prodId).children('.cart-item-quantity'), qty=qtyEle.text();
				qtyEle.text(parseInt(qty)+1);
				//update total cart price
				updateTotalPriceInCart(clckEle, '+');
				clckEle.removeClass('qty-inc');
			}

		},
		error: function(response) {
			//log js errors
			if(fromCart === undefined)
				clckEle.removeClass('adding-to-cart');
			if(fromCart === 'cart')  
				clckEle.removeClass('qty-inc');	
			shortTimeMesg('Alert! Item did not added. Try Again!', 'short-time-msg-failure');
		}
	}
	);
}

/* 
	* this will update total price in cart
*/
function updateTotalPriceInCart(clckEle, opr) {
	//change the total price
	//get the price first
	var totEle = $('#cart-tot'), tot=parseInt(totEle.attr('data-total')),
		prodPrice=parseInt(clckEle.attr('data-price')), finalPrice;

	//perform calculation
	if(opr === '+')
		finalPrice = tot + prodPrice;
	else
		finalPrice = tot - prodPrice;

	//add to total
	totEle.text('Total: '+finalPrice).attr('data-total', finalPrice);

}

/* 
	* It shows an message on screen and close after few seconds
*/
function shortTimeMesg(msg, cls) {
	var c = $('#container'), msg;
	msg = '<div class="'+cls+' user-msg-cont"><h2 id="user-msg">'+msg+'</h2></div>';
	c.prepend(msg);
	msg = $('.user-msg-cont');
	setTimeout(function() {
		msg.css({'height':'50px', 'top':'0'});
		setTimeout(function() {
			msg.css('height', '0px');
			setTimeout(function() {
				msg.remove();
			}, 500);
		}, 3000);
	}, 500); 
	
}
/* 
	* this fetches the cart details from the session
*/
function showCart() {
	$.ajax(
	{
		url: 'php_scripts/actions.php',
		type: 'POST',
		data: 'action=show-cart',
		dataType: 'JSON',
		success: function(data) {
			appendCartToDom(data);

			//remove loading
			closeLoading();
		},
		error: function(response) {
			//log js errors
			shortTimeMesg('Alert! No items found!', 'short-time-msg-failure');

			//remove loading
			closeLoading();
		}
	}
	);
}

/* 
	* removes an element from cart
*/
function removeItemFromCart(prodid, qty, qtyTd, clckEle) {
	$.ajax(
		{
			url: 'php_scripts/actions.php',
			type: 'POST',
			data: 'prodId='+prodid+'&action=remove-item-from-cart',
			dataType: 'JSON',
			success: function(data) {
				//check the quantity first, if greater than 1 than decrement by 1
				if(qty > 1) {
					qtyTd.children('.cart-item-quantity').text(qty-1);
				} else {
					//remove row from ui
					//parent is tr, qtyele is td
					qtyTd.parent().remove();
				}
				updateTotalPriceInCart(clckEle, '-');
				//show success message
				shortTimeMesg('Successfully removed an item from cart', 'short-time-msg-success');
				clckEle.removeClass('item-removing');
			},
			error: function(response) {
				//log js errors
				shortTimeMesg('Alert! Item did not removed. Try Again!', 'short-time-msg-failure');
				clckEle.removeClass('item-removing');
			}
		}
	);	
}

/* 
	* this will conver json result into html elements and adds to dom
*/
function appendCartToDom(data) {
	var cartHdr = ['image','name', 'price', 'categorie_name','location','shop_name', 'shop_rating', 'stock', 'quantity'];
	var tbl = $('<table id="cart-tbl" cellpadding="4"></table>'), tr, td, th;
	
	//prepare header
	tr = $('<tr id="cart-first-row"></tr>');
	$.each(cartHdr, function(k,v) {
		th = '<th>'+v.toUpperCase().replace('_', ' ')+'</th>';
		tr.append(th);
	});
	tr.append('<th></th>');
	tbl.append(tr);

	//prepare body
	var tot = 0, prodId, eachPrice;
	$.each(data, function(id, item) {
		item = item[0]; //contains actuall data
		eachPrice = item['price'];
		tot += +(eachPrice*item['quantity']); //add the price
		prodId = item['product_id'];

		//prepare each row of data
		tr = $('<tr></tr>');
		$.each(cartHdr, function(k,v) {
			td = $('<td></td>');
			cartStylings(td, v, item[v],prodId);
			tr.append(td);
		});

		//add full description link
		td = '<td><img height="15" width="15"  src="icons/view.png" id="'+prodId+'" class="cart-view-full-desc" title="View full description!" /> </td>';
		tr.append(td);
		
		//add quantity increaser
		td = '<td><span data-id="'+prodId+'" data-price="'+eachPrice+'" class="increase-item-qty" title="Increase quantity" ><span></td>';
		tr.append(td);

		//add del image to each row
		td = '<td><span data-price="'+eachPrice+'" id="'+prodId+'" class="remove-cart-item" title="It removes an item from cart!" ></span></td>';
		tr.append(td);
		//add row to table
		tbl.append(tr);
	});
	var tot = '<span id="cart-tot" data-total="'+tot+'">Total: '+tot+'</span>';
	//now finally add table to dom
	$('#cart-items').append(tbl).append(tot);

}
/* 
	* cart stylings
*/
function cartStylings(ele, typ, val, pid) {
	switch(typ) {
		case 'image': 
			var img = '<img src="'+val+'" width="40" height="40" />';
			ele.append(img);
			break;

		case 'price':
			ele.text(val+'/each');
			break;

		case 'quantity':
			ele.attr('id', 'qty-'+pid);
			ele.html('<h2 class="cart-item-quantity">'+val+'</h2>');
			break;


		default: 
		ele.append(val);
		break;
	}
}

/* 
	* this will fetch the results from server
*/
function showResults(search) {
	//show loading icon in btn
	var btn = $('#search');
		btn.addClass('searching');
	$.ajax(
	{
		url: 'php_scripts/actions.php',
		type: 'POST',
		data: 'action=search&search='+search,
		dataType: 'JSON',
		success: function(data) {
			// console.log(data.length);
			// console.log(typeof data[0] !== 'object');
			// var result = JSON.parse(data);
			appendResultToDom(data);
			//remove loading from search btn
			btn.removeClass('searching');
		},
		error: function(response) {
			//log js errors
			shortTimeMesg('Alert! Search failed!', 'short-time-msg-failure');
			//remove loading from search btn
			btn.removeClass('searching');
		}
	}
	);
}

/* 
	* this will show search results to user
*/
function appendResultToDom(result) {
	var c = $('<div id="search-result-cont"></div>'),row,title;
	//if results already exist then remove it
	var cont = $('#search-result-cont');
	if(cont.length > 0) {
		cont.remove();
	}

	//check if it contains valid results
	if(typeof result[0] !== 'object') {
		row = '<div class="search-result-empty">No results found for: <span class="search-results-empty">'+result.toString()+'</span></div>';
		c.append(row);
	} else {
		//add each result row
		$.each(result, function(k,v) {
			title = 'Price: '+v['price']+' Rating: '+v['product_rating'];
			row = '<div class="search-result" id="'+v['product_id']+'" title="'+title+'" type="'+v['product_type']+'" brand="'+v['company_name']+'" >'+v['name'];
			row += '</div>';
			c.append(row);
		});
	}
	$('#search-cont').prepend(c);
}


/* 
	* this show results for searched item
*/
function showResultsForSearchItem(prodType, name, prodId, brand) {
	var c = $('#item-container'), products=$('<div class="product-type"></div>');
	var title = $('<span class="product-type-name"></span>');
	//set title name
	title.text(prodType.toUpperCase());
	products.append(title);
	//show title for user till getting full results
	c.html(products);
	//make an ajax call and get all results
	$.ajax(
	{
		url: 'php_scripts/actions.php',
		type: 'POST',
		data: 'action=search-full-results&typ='+prodType+'&n='+name+'&id='+prodId+'&b='+brand,
		dataType: 'JSON',
		success: function(data) {
			//show search item results
			appendSearchItemResults(data, prodId);

			//show loading
			closeLoading();
		},
		error: function(response) {
			//log js errors
			shortTimeMesg('Alert! Search full results failed!', 'short-time-msg-failure');

			//show loading
			closeLoading();
		}
	}
	);
}

/* 
	* this will show complete results of particular search query
*/
function appendSearchItemResults(result, prodId) {
	var htmlStr, codeFrag=$('<div></div>'), c=$('.product-type'), id;

	//loop through each product and add details
	$.each(result, function(k,v) {
		id = v['product_id'];
		htmlStr = '<div class="item" url="'+v['image']+'"><div class="item-details">';
		htmlStr += '<h1 class="item-name">'+v['name']+'</h1><p class="item-desc">'+v['description']+'</p><div class="line-break"></div>';
		htmlStr += '<span class="item-price">'+v['price']+' </span>';
		htmlStr += '<span class="item-rating">'+v['product_rating']+'</span><div class="line-break"></div>';
		htmlStr += '<div class="item-btn-container"><input type="button" value="View" class="full-desc theme-btn" id="'+id+'"/><input type="button" value="BUY !" class="buy theme-btn" id="'+id+'"/> </div>';
		htmlStr += '</div></div>';

		// add to container
		if(id == prodId) {
			codeFrag.prepend(htmlStr);
		} else {
			codeFrag.append(htmlStr);	
		}
		
	});

	//now finally add to dom
	c.append(codeFrag);

	//once added to dom, load images
	$('.item').each(function() {
		var t = $(this), url = t.attr('url');
		t.css('backgroundImage', 'url("'+url+'")');
	});

}

/* 
	* send user password to user
	* params fld element, close btn, email id
*/
function sendPasswordToUser(fld, email, minimizeBtn) {
	//send data to php
	$.ajax(
	{
		url: 'php_scripts/actions.php',
		type: 'POST',
		data: 'action=send-password&email='+email,
		dataType: 'JSON',
		success: function(data) {
			fld.val(' Password sent!');
			//conver minimize UI to Close UI
			minimizeBtn.val('X');
		},
		error: function(response) {
			fld.val(' failed..');
			//conver minimize UI to Close UI
			minimizeBtn.val('X');
		}
	}
	);
}

function showHomePageProducts() {
	//show loading message
	showLoading();

	//make an ajax call getProductsOfType.php
	$.ajax(
		{
			url: 'php_scripts/actions.php',
			type: 'POST',
			dataType: 'JSON',
			data: 'action=homepage',
			success:function(promos) {
				drawCompletePromos(promos);

				//show images to user
				showPromoImages();

				//show loading
				closeLoading();
			},
			error: function(response) {
				//log js errors
				shortTimeMesg('Alert! Loading of home page promos failed!', 'short-time-msg-failure');

				//log error
				phpLogError(response.responseText);

				//show loading
				closeLoading();
			},
		}
	);
}

/* this below functions are hot, let them be bottom of page */

/* 
	* Log php errors
*/
function phpLoagError(msg) {
	console.log(msg);
}

/* 
	* this is the generic function to show loading
	* its an aync function
*/
function showLoading() {
	setTimeout(function() {
		// $('#home').addClass('loading');
		document.getElementById('home').setAttribute('class', 'navigation loading');
	}, 0);
}

/* 
	* remove pop if already exist
*/
function removePopUpIf() {
	var pup = $('#pop-up-cont');
	if(pup.length > 0) {
		pup.remove();
	}
}

/* 
	* this is the generic function to remove loading
	* its an aync function
*/
function closeLoading() {
	setTimeout(function() {
		// $('#home').removeClass('loading');
		document.getElementById('home').setAttribute('class', 'navigation');
	}, 0);
}


/* 
	* this will log js errors
	* accepts messsage str and writes into file via php
*/
function jsLogError(msg) {
	//log error
}