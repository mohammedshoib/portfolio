/*
* check for form is empty,
* if so then show error
* then return false else returns email and password
*/ 
  function validateLoginRegisterFields() {
  	var userid=$('#user-id'),pwd=$('#password'),status=true, usrErr=$('#user-id-error'),pwdErr=$('#password-error'), usrval=userid.val().trim(),pwdval=pwd.val().trim(),valideml=/.*@[a-z]+\.+.*/,validPwd=/.*(([a-zA-z]+[0-9]+)|([0-9]+[a-zA-z]+)).*/;
  	if(usrval == ''){
  		usrErr.text('Userid is empty!').removeClass('none');
  		setTimeout(function() {
  			usrErr.css('width','50%');  			
  		}, 0);
      status=false;
  	} else if(!valideml.test(usrval)) {
      usrErr.text('Invalid email id').removeClass('none');
      setTimeout(function() {
        usrErr.css('width','50%');        
      }, 0);
      status=false;
    } else {
  		usrErr.addClass('none').css('width','40%');
  	}
  	if(pwdval == ''){
  		pwdErr.text('Password is empty!').removeClass('none');
  		setTimeout(function() {
  			pwdErr.css('width','50%');  			
  		}, 0);
      status=false;
  	} else if(!validPwd.test(pwdval)) {
      pwdErr.text('Invalid password').removeClass('none');
      setTimeout(function() {
        pwdErr.css('width','50%');        
      }, 0);
      status=false;
    } else {
  		pwdErr.addClass('none').css('width','40%');
  	}

    if(status === false) {
      return false;
    } else {
      var result = [];
      result['email'] = usrval;
      result['pwd']   = pwdval;
      return result;
    }
  }


/*
* resize the content of homepage, if it is short
* this is usually happens when screen is lenthier than app
* it only resizes center content and footer, its makes sure footer is properly alligned
* to bottom
*/
  function resizeHomePage() {
  	var innerHeight=window.innerHeight || document.documentElement.clientHeight,centerContainer=$('#center-container'),container=$('.container'),masterContainerHeight;
    //typecast the center container height
  	centerContainerHeight=parseInt(centerContainer.css('height').replace('px',''));
    //typecast the master container
    masterContainerHeight=parseInt(container.css('height').replace('px',''));
  	
    //if true, then increase center container height
  	if(masterContainerHeight < innerHeight) {
  		requiredHeight = innerHeight - masterContainerHeight; 
  		centerContainer.css('height', (centerContainerHeight+requiredHeight)+'px');
  	}

  }


/*
* it calls the server, to register user
*/
  function registerUser(values) {
     //var reg = $('#register'), errMsgContainer=$('#responseFromServer'),errMsg=$('#responseFromServerMsg');
     //make default
     //errMsg.css('left','-100px')
     $.ajax({
      url:'server.scripts/actions.php',
      type: 'POST',
      data: 'email='+values['email']+'&password='+values['pwd']+'&action=register',
      dataType: 'JSON',
      success: function(data) {   
        //errMsg.text(data.message); 
        //errMsgContainer.css('display','block');
        setTimeout(function() {
          //errMsg.css({'left':'0'});
          if(data.status === true) { 
            //redirect to login page
            //errMsg.addClass('responseFromServerSuccess');
              Momeen.notification(data.message);
          } else {
            //errMsg.addClass('responseFromServerError');
              Momeen.notification(data.message);
          } 
        }, 10);
        
       // reg.removeClass('loginRegsiterLoader');
       //close loader
       Momeen.loaderClose();
      },
      error: function(resp) {
       // setTimeout(function() {
       //    //errMsg.text('Something Wrong. We are fixing it!').css({'left':'0'}).addClass('responseFromServerError');
       //  }, 10);
        Momeen.notification('Something Wrong. We are fixing it!');
        //reg.removeClass('loginRegsiterLoader');
        //close loader
        Momeen.loaderClose();
      }
     });
  }


/*
* it calls the server, to register user
*/
  function allowLogin(values) {
    //var login = $('#login'), errMsgContainer=$('#responseFromServer'),errMsg=$('#responseFromServerMsg');
    //make default
    //errMsg.css('left','-100px');
     $.ajax({
      url:'server.scripts/actions.php',
      type: 'POST',
      data: 'email='+values['email']+'&password='+values['pwd']+'&action=login',
      dataType: 'JSON',
      success: function(data) {
        //errMsg.text(data.message);
        //errMsgContainer.css('display','block');
        setTimeout(function() {
          //errMsg.css({'left':'0'});
          if(data.status === true) { 
            //redirect to login page
            //errMsg.addClass('responseFromServerSuccess');
            Momeen.notification('Please wait! Redirecting..');
            setTimeout(function() {
              window.location = M_homepage;
            }, 1000);
          } else {
            //errMsg.addClass('responseFromServerError');
            Momeen.notification(data.message);
          } 
        }, 10);
        
       // login.removeClass('loginRegsiterLoader');
       //close loader
       Momeen.loaderClose();
      },
      error: function(resp) {
        //  setTimeout(function() {
        //   errMsg.text('Something Wrong. We are fixing it!').css({'left':'0'}).addClass('responseFromServerError');
        // }, 0);
        Momeen.notification('Something Wrong. We are fixing it!');
        //login.removeClass('loginRegsiterLoader');
        //close loader
        Momeen.loaderClose();
      }
     });
  }