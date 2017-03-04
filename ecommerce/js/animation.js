//on scroll, make nav header fixed after some scroll
$(window).scroll(function() {
	var scrollYPos = window.scrollY, _d=document, ele = _d.getElementById('navigation_btns_cont');
	// console.log(scrollYPos);
	if(scrollYPos > 72 ) {
		ele.setAttribute('class', 'navigation-cont-fixed');
	} else {
		ele.removeAttribute('class');
	}
});

//on mouse over of pic show zoom, author shoib
(function() {
	$('body').on('mousemove', '#prod-pic', function(e) {
		var t = $(this), img = t.css('backgroundImage'), x = e.offsetX, y = e.offsetY;
		var zp = $('#zoom-pic'), cx, cy;

		cx = -x;
		cy = -y;	

		zp.css(
			{
				'display':'block',
				'top':(y-10)+'px', 
				//'left':(x+50)+'px',
				'backgroundImage':img, 'backgroundPosition':(cx+'px ')+(cy+'px')
			}
		);

	});

	$('body').on('mouseout', '#prod-pic', function() {
		var zp = $('#zoom-pic');
		zp.css({'display':'none'});
	});
})();