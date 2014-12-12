$(document).ready(function(){

   $("#button_login").click(login);
   
   $("#button_register").click(register);

});

function loginClick(){
	//window.localStorage.userId = "Jeff";
	//window.location.replace("questions.jsp");
}

function getXmlHttpRequestObject() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest(); //To support the browsers IE7+, Firefox, Chrome, Opera, Safari
	} else if(window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP"); // For the browsers IE6, IE5
	} else {
		alert("Error due to old verion of browser upgrade your browser");
	}
}

var rcvReq = getXmlHttpRequestObject();

function openLoginPane(){
	document.getElementById("register_fields").hidden = true;
	document.getElementById("login_fields").hidden = false;
}

function openRegisterPane(){
	document.getElementById("login_fields").hidden = true;
	document.getElementById("register_fields").hidden = false;
}

function login(){
	var userid = document.getElementById("username").value;
	var pswd = document.getElementById("password").value;
	
	var json_obj = {
			"user_id" : userid,
			"password" : pswd
	}
	
	console.log("JSON = "+json_obj);
	
	if (rcvReq.readyState == 4 || rcvReq.readyState == 0) {
		console.log("Clicked login");
		rcvReq.open("POST", 'LoginUser', true);
		rcvReq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		rcvReq.onreadystatechange = loginHandler;
		rcvReq.send(JSON.stringify(json_obj));			
	}
}

function loginHandler(){
	var returnNo = 0;
	if (rcvReq.readyState == 4) {
		var retVal = rcvReq.responseText.toString();
		returnNo = retVal.substring(retVal.indexOf("<!--value:")+10,retVal.indexOf(";-->"));
		console.log("Login ret val = "+returnNo);
		if(returnNo==1){
			window.localStorage.userId = document.getElementById("username").value;
			window.localStorage.password = document.getElementById("password").value;
			window.location.replace("questions.jsp");
		}
		else{
			alert("Credentials are wrong, please enter again");
		}
	}
}

function register(){
	var userid = document.getElementById("username2").value;
	var pswd = document.getElementById("password2").value;
	var pswd2 = document.getElementById("password3").value;
	
	if(pswd!=pswd2){
		document.getElementById("password2").value = "";
		document.getElementById("password3").value = "";
		alert("Passwords do not match, please enter again");
	}
	else if (pswd==pswd2){
		var tag = false;
		var skills = null;
		if(document.getElementById("tag_me").checked == true){
			tag = true;
			var skill_list = document.getElementsByClassName("skills");
			for (var i = 0; i<skill_list.length; i++){
				if(skill_list[i].checked==true){
					console.log(skill_list[i].value);
					skills = skills + skill_list[i].value + ";";
				}
			}
			/*if(skills!=null)
				skills = "["+skills+"]"*/
		
		}
		var json_obj = {
				"user_id" : userid,
				"password" : pswd,
				"tag" : tag,
				"skills" : skills
		}
		
		console.log(json_obj);
		
		if (rcvReq.readyState == 4 || rcvReq.readyState == 0) {
			console.log("Clicked register");
			rcvReq.open("POST", 'RegisterUser', true);
			rcvReq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
			rcvReq.onreadystatechange = registerHandler;
			rcvReq.send(JSON.stringify(json_obj));
		}
	}
	
}

function registerHandler(){
	if (rcvReq.readyState == 4) {
		window.localStorage.userId = document.getElementById("username2").value;
		window.localStorage.password = document.getElementById("password2").value;
		window.location.replace("questions.jsp");
	}
}