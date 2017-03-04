/*
* Momeen is the namespace for view.performance
* It contains some custom api's for showing popup messages with animations
*
* Momeen is the namespace
* 
* Dependencies: jQuery, later remove this dependencies
*
* Hope this goes well, insha allah
*/


/*
*
* Globals
*/
var _b = $('body');


/*
*
* init is a wrapper
*/
var init = function() { };


/*
*
* wrap everything in init
*/
init.prototype.warning = function(obj) {
	var obj   = obj || {};
	var title = obj.title || "Alert";
	var msg   = obj.message || "Your message!";

	alert(msg);
}	

init.prototype.animate = function(target, obj) {
	if(!target)
		return;

	var obj = obj || {};
	var ele = $(target);
	
	//set animator class
	ele.addClass('animator-type1');

	//set css properties
	$.each(obj, function(k,v) {
		ele.css(k,v); 
	});
}

init.prototype.loader = function(str) {
	var msg = str || "Please Wait!";

	var html = "<div class='loader'>"+msg+"</div>";
	_b.append(html);

	//init styling of element
	var ele = $('.loader'), h=parseInt(ele.css('height').replace('px',''));
	ele.css({'top':(-h*2)+'px', 'visibility':'visible'}); //2 because, am not able to get exact number to hide

	setTimeout(function() {
		Momeen.animate('.loader', {'top':'0'});			
	}, 0);

}

init.prototype.notification = function(str) {
	var msg = str || "Please Wait!";

	var html = "<div class='notification'>"+msg+" <span class='notif-close'> </span> </div>";
	_b.append(html);

	//attach click event
	Momeen.attachClick('span');

	//init styling of element
	var ele = $('.notification'), h=parseInt(ele.css('height').replace('px',''));
	ele.css({'top':(-h*2)+'px', 'visibility':'visible'}); //2 because, am not able to get exact number to hide

	setTimeout(function() {
		Momeen.animate('.notification', {'top':'0'});			
	}, 0);

}

init.prototype.loaderClose = function() {
	var ele = $('.loader'), h=parseInt(ele.css('height').replace('px',''));
	ele.css({'top':(-h*2)+'px'});		
	setTimeout(function() {
		ele.remove();
	}, 500);
}


/*
*
* Event listners
*/

/* 
* This below click event removes notification message from dom
*/
var notificationClassNamesMappings = [];
notificationClassNamesMappings['notif-close'] = 'notification';
init.prototype.attachClick = function(tag) {
	var spans = document.getElementsByTagName(tag);

	var cls, clsArr=[],nfc='', parentClassName, clickClsName,clickClsNameArr, foundEle, hgt;
	for(k in spans) {
		cls = spans[k].className;
		parentClassName = notificationClassNamesMappings[cls];
		clsArr = (cls) ? cls.split(' '): [];
		for(var i=0,len=clsArr.length; i<len; i++) { 
			nfc = clsArr[i];
			parentClassName = notificationClassNamesMappings[nfc];
			if(parentClassName != 'undefined') { //attach click event
				spans[k].onclick = function(e) {
					clickClsName = e.target.className;
					clickClsNameArr = clickClsName.split(' ');
					for( e in clickClsNameArr) {
						foundEle = notificationClassNamesMappings[clickClsNameArr[e]]; 
						if( foundEle != 'undefined') {
							setTimeout(function() {
								hgt = parseInt($('.'+foundEle).css('height').replace('px', ''));
								Momeen.animate('.'+foundEle, {'top':'-'+hgt*3+'px'});	
								setTimeout(function() {
									$('.'+foundEle).remove();
								}, 500);		
							}, 0);
						}
					}
				}
			}
		}
	}

}


/*
* initialize
*/
var Momeen = new init();


/*
* later remove below code
*/

//show message which remains on dom, till user closes
var msg = "This application is under development! might not work properly in older or ie browsers. So have patience. <a href='https://github.com/mohammedshoib/view.performance' target='_blank'>Source</a>";
Momeen.notification(msg);