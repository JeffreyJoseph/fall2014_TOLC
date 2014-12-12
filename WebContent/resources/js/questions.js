$(document).ready(function(){
	
   var userid =  window.localStorage.userId
   console.log("Userid = "+userid);
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
	console.log("second page load user");
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
		
		document.getElementById("user_score").innerHTML = currentUser.score;
		document.getElementById("moderator_score").innerHTML = currentUser.moderatorScore;
		var skills = window.localStorage.userSkills;
		var skill_set = skills.split(",");
		for(var i=0; i<skill_set.length; i++)
			document.getElementById(skill_set[i]).checked = true;
	}
}

function loadUserDetails(){
	var userId = window.localStorage.userId;
	//document.getElementById("logged_as").value = userId;
	//document.getElementById("tagged_qns").value = window.localStorage.taggedPosts;
	//document.getElementById("user_score").value = window.localStorage.userScore;
	
	var skills = window.localStorage.userSkills;
	var skill_set = skills.split(",");
	for(var i=0; i<skill_set.length; i++)
		document.getElementById(skill_set[i]).checked = true;
}

function loadAllQns(){
	console.log("second page");
	loadUserDetails();
	
	if (rcvReq.readyState == 4 || rcvReq.readyState == 0) {
		rcvReq.open("POST", 'OpenAllQuestions', true);
		rcvReq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		rcvReq.onreadystatechange = loadQuestions;
		//rcvReq.send(JSON.stringify(json_obj));
		rcvReq.send(null);
	}
}

function loadTaggedQns(number){
	loadUserDetails();
	var userId = window.localStorage.userId;
	
	var json_obj = {
			"user_id" : userId,
			"signal" : number
	}
	
	if (rcvReq.readyState == 4 || rcvReq.readyState == 0) {
		rcvReq.open("POST", 'OpenTaggedQuestions', true);
		rcvReq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		rcvReq.onreadystatechange = loadQuestions;
		rcvReq.send(JSON.stringify(json_obj));
		rcvReq.send(null);
	}
}

function loadQuestions(){
	if (rcvReq.readyState == 4) {
		//console.log("second page load qns");
		/*var obj = {
				"qn_no" : 1,
				"qn" : "Here is the qn"
		};
		console.log("obj.length = "+obj.length);
		var count_posts = obj.length;*/
		
		var json = rcvReq.responseText;
		var obj = JSON.parse(json);
		var count_posts = obj.length;
		console.log("count_posts "+count_posts);
		
		var div = document.createElement("div");
	    div.setAttribute("class", "div_questions");
	    div.setAttribute("id", "div_questions");
	    
	    for(var i=0;i<count_posts;i++){
	    	var qn_no = obj[i].postId;
	    	var qn = obj[i].postContent;
	    	
	    	var inner_div = document.createElement("div");
	    	if(i%2==0)
	    		inner_div.setAttribute("style", "background-color:#FFFFD1");
	    	else
	    		inner_div.setAttribute("style", "background-color:#FFFFA3");
	    	
	    	var button_openqn = document.createElement("input");
	    	button_openqn.setAttribute("type", "button");
	    	button_openqn.setAttribute("class", "button_enterqn"+qn_no);
	    	button_openqn.setAttribute("id", "button_enterqn"+qn_no);
	    	button_openqn.setAttribute("value", qn_no);
	    	button_openqn.setAttribute("onclick","openQn(\"" + button_openqn.getAttribute("value") + "\")");
		    
		    /*var text_area = document.createElement("input");
		    text_area.setAttribute("type", "text");
		    text_area.setAttribute("class", "txt_qn"+qn_no);
		    text_area.setAttribute("id", "txt_qn"+qn_no);
		    text_area.setAttribute("value", qn);
		    text_area.setAttribute("size", "187");*/
	    	
	    	var text_area = document.createElement("p");
	    	var text = document.createTextNode(qn);
	    	text_area.appendChild(text);
	    	
		    
		    var line_break = document.createElement("br");
		    
		    inner_div.appendChild(button_openqn);
		    inner_div.appendChild(text_area);
		    div.appendChild(inner_div);
		    
		    
	    }
	    document.getElementById('bottom_pane').innerHTML = "";
	    document.getElementById("bottom_pane").appendChild(div);
	}
}



function saveChanges(){
	var tag = false;
	var skills = null;
	if(document.getElementById("tag_me").checked == true){
		tag = true;
		var skill_list = document.getElementsByClassName("skills");
		for (var i = 0; i<skill_list.length; i++){
			if(skill_list[i].checked==true){
				console.log(skill_list[i].value);
				skills = skill_list[i].value+","
			}
		}
		if(skills!=null)
			skills = "["+skills+"]"
	
	}
	var userId = window.localStorage.userId;
	var password = window.localStorage.password;
	
	var json_obj = {
			"user_id" : userId,
			"password" : password,
			"tag" : tag,
			"skills" : skills
	}
	
	if (rcvReq.readyState == 4 || rcvReq.readyState == 0) {
		console.log("Clicked register");
		rcvReq.open("POST", 'RegisterUser', true);
		rcvReq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		//rcvReq.onreadystatechange = registerHandler;
		rcvReq.send(JSON.stringify(json_obj));
	}
	
}

function openQn(qnNo){
	window.localStorage.singleQn = qnNo;
	window.location.replace("singlepost.html");
}

function newQnPage(){
	window.location.replace("singlepost.html");
}