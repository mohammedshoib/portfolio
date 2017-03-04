/* 
* all homepage functionality are include here
* trying to implement all best practicess as much as possible
* @shoib, momeen.com
*/


//change ui to fit for mobile
if(isMobile.any()) {
  //set middle area to 100% width
  var g = document.getElementById('graph-container'), lg=document.getElementById('login-registeration-container');
  g.setAttribute('class', g.className + ' homepage-middle-container-ismobile');
  lg.setAttribute('class', lg.className + ' homepage-middle-container-ismobile');

  //set form title to 99%
  document.getElementById('reg-login-title').style.width='99%';
}
  

(function() {

//cache some objects in global var
//var _body=$('body');

/*
* as soon as dom loads finishes, resize the homepage, to fit in screen, if less
*/
  resizeHomePage();

/* 
* on focus of input show hint!
* on blur hide hint!
*/
/*  _body.on('focus', '.basic-reg-login-input', function(e) {
	 var t=$(this),id=t.attr('id'),hint=$('#'+id+'-hint');
	 hint.removeClass('hide').addClass('reg-login-hint-active');
  });*/
  /*_body.on('blur', '.basic-reg-login-input', function(e) {
	 var t=$(this),id=t.attr('id'),hint=$('#'+id+'-hint');
	 hint.addClass('hide').removeClass('reg-login-hint-active');
  });*/

/* 
* on blur of user id validate email using regx
*/
 // _body.on('blur', '#user-id', function(e) {
 // 	var t=$(this),eml=t.val(),validEmail=/.*@[a-z]+\.+.*/, tick=$('#user-id-isvalid');
  //	if(validEmail.test(eml)) {
  	//	tick.addClass('user-id-isvalid-tick');
  	//} else {
  	//	tick.removeClass('user-id-isvalid-tick');
  //	}
  //});

/* 
* on blur of password, validate 
* should contain atleast 6 character length
* one character should be number
*/
  //_body.on('blur', '#password', function(e) {
  	//var t=$(this),pwd=t.val(),validPwd=/.*(([a-zA-z]+[0-9]+)|([0-9]+[a-zA-z]+)).*/, tick=$('#password-isvalid');
  	//if(validPwd.test(pwd)) {
  	//	tick.addClass('user-id-isvalid-tick');
  	//} else {
  		//tick.removeClass('user-id-isvalid-tick');
  //	}
  //});


/* 
* on hover of footer company logo, show some information about the company and author i.e shoib mohammed a
* on blur hide information
*/
 /* _body.on('mouseover', '#footer-logo', function(e) {
    var elem2Show=$('#aboutMomeenDotCom');
    elem2Show.css('display','block');
  }).mouseout(function(e) {
    var elem2Show=$('#aboutMomeenDotCom');
    elem2Show.css('display','none');
  });*/
  document.getElementById('footer-logo').addEventListener('mouseover', function(e) {
    var id=document.getElementById('aboutMomeenDotCom')
    id.style.display = 'block';
  });
  document.getElementById('footer-logo').addEventListener('mouseout', function(e) {
    var id=document.getElementById('aboutMomeenDotCom')
    id.style.display = 'none';
  });

/* 
  --------- Code enhanced by shoib, using delegates instead of attaching event to each button
*/


/*
* login
*/
  /*_body.on('click','#login', function() {
    var t=$(this);
    //validate fields, on success it will return field values i.e email and pwd
    var values = validateLoginRegisterFields();
    if(values === false){
      return;
    }
    t.addClass('loginRegsiterLoader');
    allowLogin(values);
  });*/

/* 
* register
*/
 /* _body.on('click', '#register', function() {
    var t=$(this);
    //validate fields, on success it will return field values i.e email and pwd
    var values = validateLoginRegisterFields();
    if(values === false){
      return;
    }

    t.addClass('loginRegsiterLoader');
    //pass details to register
    registerUser(values);
    
  });*/
/* 
* on focus of input show hint!
* on blur hide hint!
*/
document.getElementById('user-id').addEventListener('focus', function(e) {
   var ele=e.target, id=ele.getAttribute('id') ;
   var hint = document.getElementById(id+'-hint');
   removeHide = hint.className.replace(/hide/g, '');
   hint.setAttribute('class', removeHide + ' reg-login-hint-active');
});
/* 
* on focus of input show hint!
* on blur hide hint!
*/
document.getElementById('password').addEventListener('focus', function(e) {
   var ele=e.target, id=ele.getAttribute('id') ;
   var hint = document.getElementById(id+'-hint');
   removeHide = hint.className.replace(/hide/g, '');
   hint.setAttribute('class', removeHide + ' reg-login-hint-active');
});
/* 
* on blur  hide hint
*/
document.getElementById('user-id').addEventListener('blur', function(e) {
  var uid = document.getElementById('user-id-hint'), uidCls=uid.className;
  uidCls = uidCls.replace(/reg-login-hint-active/g,'').trim(); //remove active class
  uid.setAttribute('class', uidCls + ' hide'); //add hide class
});

/* 
* on blur  hide hint
*/
document.getElementById('password').addEventListener('blur', function(e) {
  var pwd = document.getElementById('password-hint'), pwdCls=pwd.className;
  pwdCls = pwdCls.replace(/reg-login-hint-active/g,'').trim(); //remove active class
  pwd.setAttribute('class', pwdCls + ' hide'); //add hide class
});

/*
* 
* using core js for listenting click events, and some tweek for focus and blur events to on user input fields
* 
*/
document.getElementById('reg-login-form-div').addEventListener('click', function(e) {
  var ele = e.target, id=ele.getAttribute('id'), cls=ele.className, ty=ele.getAttribute('type');

  //check if it is clicked on target element else act it as blur event for user input, in login or reg area
  if(ty !== 'button') {
    //this is blur case for user input
    return;
  }
    

 
  switch(id) {
    
    case 'login':        
    case 'register': 

     //validate fields, on success it will return field values i.e email and pwd
    var values = validateLoginRegisterFields();
    if(values === false){
      break;
    }
    //ele.setAttribute('class', cls + ' loginRegsiterLoader' );
    //show loader
    Momeen.loader('Please Wait!');


    if(id === 'login') {
      //pass details to register
      allowLogin(values);          
    } else {
      //pass details to register
      registerUser(values);  
    }

    break;

  }
});


//show the status of project if first time visiting
(function() {
  var c=document.cookie, arr=c.split(';');
  var len=arr.length,variable;
  var status=false;
  //loop through each cookie variable and check whether name exists
  for(var i=0;i<len;i++) {
    variable = arr[i].split('=');
    if(variable[0].trim() == 'firsttime') {
      status=true;
    }
  }

  //show the first time visitors message
  if(status === false) {
    var ele=$('#first-time-visitors');
    ele.css('display','block');
    document.cookie = 'firsttime=yes';
    setTimeout(function() {
     ele.remove();
    }, 6000);
  }

})();


/*
        ------------------------------ end 
*/


	//end of qucik load function
})()