/*
* Fuction which logs the error in the file
*/
var logJavascripError = function(str) {
	$.ajax(
	{
		url: 'server.scripts/actions.php',
		type: 'POST',
		dataType: 'JSON',
		data: 'message='+str+'&action=jserrorlog',
		success: function(data) {
			console.log(data);
		},
		error: function(resp) {
			console.log('Failed to log javascript error.');
			console.log(resp);
		}
	}
	);
};

/* 
* change the ui if not computer
* Thanks to this user: http://www.abeautifulsite.net/blog/2011/11/detecting-mobile-devices-with-javascript/
*/

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


/*
* Catch javascript errors
*/
window.onerror = function(errorMsg, url, lineNumber, column, errorObj) {
	var message = '';
	message =  " URL: " + url + "\t LineNumber: " + lineNumber;
	message += "\t Column: " + (column?column:'') + "\t ErrorObj: "+ errorObj;

	//log javascript error
	logJavascripError(msg);
};

