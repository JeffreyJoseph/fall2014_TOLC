$(document).ready(function(){
	
   var userid =  window.localStorage.userId
   $("#logged_as").text(userid);
   loadUser();

});

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

function loadUser(){
	console.log("SingleQn page load user");
	var userId = window.localStorage.userId;
	var json_obj = { "user_id" : userId };
	if (rcvReq.readyState == 4 || rcvReq.readyState == 0) {
		rcvReq.open("POST", 'FetchUserDetails', true);
		rcvReq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		rcvReq.onreadystatechange = userDetailsHandler;
		rcvReq.send(JSON.stringify(json_obj));
	}
}

function userDetailsHandler(){
	if (rcvReq.readyState == 4) {
		var json = rcvReq.responseText;
		var currentUser = JSON.parse(json);

		window.localStorage.taggedPosts = currentUser.taggedPosts;
		window.localStorage.userScore = currentUser.score;
		window.localStorage.userModScore = currentUser.moderatorScore;
		window.localStorage.userSkills = currentUser.userTags;
		console.log(window.localStorage.userSkills);
	}
}

function newQuestion(){	
	
	var postId = 1;
	var postOwner = window.localStorage.userId;
	var postContent = document.getElementById("text_newcomment").value;
	var skills = "";
	
	var skill_list = document.getElementsByClassName("skills");
	for (var i = 0; i<skill_list.length; i++){
		if(skill_list[i].checked==true){
			console.log(skill_list[i].value);
			skills = skills + skill_list[i].value + ";";
		}
	}
	
	var json_obj = {
			"postId" : postId,
			"postOwner" : postOwner,
			"postContent" : postContent,
			"tags" : skills
	}
	
	if (rcvReq.readyState == 4 || rcvReq.readyState == 0) {
		//console.log("Clicked post");
		rcvReq.open("POST", 'NewQuestion', true);
		rcvReq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		rcvReq.onreadystatechange = newQuestionHandler; 
		rcvReq.send(JSON.stringify(json_obj));
		
	}
}

function newQuestionHandler(){
	if (rcvReq.readyState == 4){
		var json = rcvReq.responseText;
		//console.log("JSON = "+json)
		var obj = JSON.parse(json);
		
		window.localStorage.singleQn = obj.postId;
		window.location.replace("singleqn.jsp");
	}
}