/* 
* todo: 
	1) show percentage of loaded data on top screen with each ajax success or error as percentage
	2) each failure should be shown to user so that he click and re call ajax
*/

$(document).ready(function() {
	//show products of user on load
	setTimeout(function() {
		showProductsOfUser();
	}, 0);	
});

/* 
* this will fetch the products of user
*/
function showProductsOfUser() {
	$.ajax(
		{
			url: '../php_scripts/user.php',
			type: 'POST',
			dataType: 'JSON',
			data: 'action=onload',
			success:function(data) {
				//appendProductsToDom(data);
				console.log(data);
			},
			error: function(response) {
				//log error
				//jsLogError('');
				alert('Failed to load your products. Aborted');
			},
		}
	);
}