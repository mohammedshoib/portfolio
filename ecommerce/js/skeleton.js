//draw the skeleton of home page, this should be loaded first
//expected less than 2seconds
(function() {
	var _d = document, c, tObj, menu, b, f, tObjLen;

	//create container element
	tObj = {'id':'container'};
	c = cE('div');
	c = sA(c, tObj);

	//create menu container
	tObj = {'id':'header'};
	menu = cE('div');
	sA(menu,tObj); 
	//create 3 rows in header
	tObj = {'0':{'id':'offers_cont','class':'header_rows'},'1':{'id':'cart_cont','class':'header_rows'},'2':{'id':'navigation_cont','class':'header_rows'}};
	tObjLen = Object.keys(tObj).length;
	var navigation_cont = cE('div');
	sA(navigation_cont, {'id':'navigation_btns_cont'});

	for(var i=0; i<tObjLen; i+=1) {
		var obj = tObj[i], row=cE('div');
		for(attr in obj) {
			sA(row, obj);
		}
		if(i==0) {
			row.innerHTML = '<div id="extra-btns-cont"><input type="button" id="user-login" value="Login" class="extra-btn" title="Do you want to sell anything?" /><input type="button" id="view-cart"  class="extra-btn" /></div>';
		} 
		else if(i==1) {
			var searchBox;
			searchBox = '<div id="search-cont"><input type="text" title="Type: lenovo z580 hp" placeholder="Enter search item here. Example: lenovo z580 hp" id="search-field" /><input type="button" id="search" value="Show" class="success" /></div>';
			row.innerHTML = searchBox;
		} 
		else if(i == 2) {
			addMenus(navigation_cont);
			aDE(navigation_cont, row);
		}
		//add to container
		aDE(row, menu);
	}
	aDE(menu,c);

	//create body container
	b = cE('div');
	tObj = {'id':'body'};
	sA(b,tObj);
	// promos will be added in this container here
	var promo_cont = cE('div');

	sA(promo_cont, {'class':'item-container','id':'item-container'});
	//add to promo container
	aDE(promo_cont, b);
	//add to container fragment
	aDE(b, c);

	//create footer container
	f = cE('div');
	tObj = {'id':'footer'};
	sA(f,tObj);
	//create footer content
	var htmlStr = "<div id='notification'></div><div id='footer_text'><span>&copy; </span>Copyright protected to <a href='http://www.momeen.com'>momeen.com</a>. All right reserved / <a href='#'> Policies </a> &nbsp;/ <a href='#' > Security </a></div>";
	aDE(htmlStr, f);
	aDE(f,c);

	//add to dom finally
	_d.body.appendChild(c);


	//now load main js, css like jquery, and plugins etc on complete dom load
	//load css files here
	setTimeout(function() {
		var cssFiles = ['css/animation.css', 'css/actions.css'], cssLen = cssFiles.length;
		for(var i=0; i<cssLen; i+=1) {
			css = _d.createElement('link');
			sA(css, {'type':'text/css','href':cssFiles[i],'rel':'stylesheet'});
			//add to dom
			_d.getElementsByTagName('head')[0].appendChild(css);
		}

		//load script files
		var scriptFiles = ['libraries/jquery-1.10.2.js', 'json/submenus.json', 'js/actions.js', 'js/functions.js', 'js/animation.js', 'json/html_str.json'], scriptsLen= scriptFiles.length, scr;
		for(var i=0; i<scriptsLen; i+=1) {
				scr = _d.createElement('script');
				scr.type = 'text/javascript';
				scr.async = false;
				scr.src = scriptFiles[i];
				//add to dom
				_d.getElementsByTagName('body')[0].appendChild(scr);
				
		}
	}, 0);

	//add menus
	function addMenus(menuCont)  {
		var m, cls={'class':'navigation'}, t, mhover, hoverFix,i=0, txtSpan, tbl=cE('table'), tr=cE('tr'),td;
		for(id in menusObj) {
			m = cE('div');
			td = cE('td');
			if(id !== 'home') {
				mhover = cE('div');
				hoverFix = cE('div');
				hoverFix.setAttribute('class', 'menu-hover-fix');
				aDE(hoverFix, mhover);
				mhover.setAttribute('class', 'sub-menu-list');
				//this is for setting sub menus to right or left based on number count
				if(i> 4)
					mhover.setAttribute('style','right:0');
				else
					mhover.setAttribute('style','left:0');
				// mhover.innerHTML = "Under Construction..";
				aDE(mhover, m);

				i++;
			}

			m.setAttribute('id', id);
			t = _d.createTextNode(menusObj[id]);
			txtSpan = cE('span');
			txtSpan.setAttribute('class', 'menu-name');
			aDE(t, txtSpan); //add txt to span
			aDE(txtSpan, m); //add txt span to menu
			sA(m, cls); //add class to menu
			aDE(m, td); //add each menu to td
			aDE(td, tr); //add td to tr
		}
		tbl.setAttribute('class', 'menu-tbl');
		aDE(tr, tbl);  //add tr to tbl
		aDE(tbl, menuCont); //add table to container
	}

})();



/* 
	*	some of the common functions used by other js 
*/

//draw promos, promos is an global json object
function drawCompletePromos(promos) {

	var _d=document, promo_cont = _d.getElementById('item-container');

	//empty the container
	promo_cont.innerHTML = '';

	for(typ in promos) {
		//each promo type container	
		typs_cont = cE('div');
		sA(typs_cont, {'class':'product-type'});

		//set the title
		title = cE('span');
		title.innerHTML = typ.toUpperCase();
		sA(title, {'class':'product-type-name'});
		//add to type
		aDE(title, typs_cont);

		promo_obj = promos[typ];
		var details,discount, discountSpan, discountDiv;

		promo_type_len = promo_obj.length;	
		for(j=0; j<promo_type_len; j++) {
			promo = cE('div');
			sA(promo, {'class':'item'});
			details = promo_obj[j];
			drawPromo(promo, details);

			//add discount if available
			discount = details['discount'];
			if(discount != 0 && discount !== undefined) {				
				discountDiv = cE('div');
				sA(discountDiv, {'class': 'discount', 'title':discount+'% available'});
				discountSpan = _d.createTextNode(discount+'%');
				aDE(discountSpan, discountDiv);
				aDE(discountDiv,promo );
			}
	
			//add to types container
			aDE(promo, typs_cont);
		}

		//add to body fragment
		aDE(typs_cont, promo_cont);
	}
}

//draw promo items
function drawPromo(ele, detailsObj) {
	// sA(ele, {'style': 'background-image: url('+detailsObj['url']+')'});
	sA(ele, {'url':detailsObj['url']});
	var details = cE('div'), discount;
	sA(details, {'class':'item-details'});
	var htmlStr = '<h1 class="item-name">'+detailsObj['name']+'</h1>';
		htmlStr += '<p class="item-desc">'+detailsObj['desc']+'</p>';
		//add some best parts
	// var best = detailsObj['best'],  li='';
	// 	for(key in best) {
	// 		li += '<li class="item-best-'+key+'">'+best[key]+'</li>';
	// 	}
	// 	htmlStr += '<ul class="item-best">'+li+'</ul>';		
		htmlStr += '<div class="line-break"></div>';	
		htmlStr += '<span class="item-price">'+detailsObj['price']+' </span>';
		htmlStr += '<span class="item-rating">'+detailsObj['rating']+'</span>';
		htmlStr += '<div class="line-break"></div>';
		htmlStr += '<div class="item-btn-container"><input type="button" value="View" class="full-desc theme-btn" id="'+detailsObj['prodid']+'"/><input type="button" value="BUY !" class="buy theme-btn" id="'+detailsObj['prodid']+'"/> </div>';
	
	//add to details container
	details.innerHTML = htmlStr; 

	//add to target element	
	aDE(details, ele);
}

function aDE(e,t) {
	var typ = typeof e;
	if(typ === 'object')
		return t.appendChild(e);
	else
		return t.innerHTML = e;
}
//set attributes to ele
function sA(obj, attr) {
   for(k in attr) {
   	obj.setAttribute(k, attr[k]);	
   }		
   return obj;
}

	
//return dom object
function cE(e) {
	var _d=document;
	return _d.createElement(e);
}
