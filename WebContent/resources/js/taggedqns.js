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
	console.log("AllQuestions page load user");
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
		
		//document.getElementById("user_score").innerHTML = currentUser.score;
		//document.getElementById("moderator_score").innerHTML = currentUser.moderatorScore;
		loadTaggedQns(1);
	}
}

function loadTaggedQns(number){
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
		
		var json = rcvReq.responseText;
		var obj = JSON.parse(json);
		var count_posts = obj.length;
		console.log("count_posts "+count_posts);
		
		var div_main = document.createElement("div");
		div_main.setAttribute("class", "snippet-content");
		
		for(var i=0;i<count_posts;i++){
			
	    	var qn_no = obj[i].postId;
	    	var qn = obj[i].postContent;
	    	var qn_owner = obj[i].postOwner.userId;
	    	var votes = obj[i].upVotes - obj[i].downVotes;
	    	qn_posted_date = obj[i].datePosted;
			
			var div_entry = document.createElement("div");
			div_entry.setAttribute("class", "snippet-entry");
			
				var div_vote_right = document.createElement("div");
				div_vote_right.setAttribute("class", "vote-right home-vote");
			
					var a_upvote = document.createElement("a");
					a_upvote.setAttribute("href", "#");
					a_upvote.setAttribute("class", "upvote");
					var span = document.createElement("span");
					span.setAttribute("class", "vote-btn");
					a_upvote.appendChild(span);
			
					var span_vote_no = document.createElement("span");
					var text_voteno = document.createTextNode(votes);
					span_vote_no.appendChild(text_voteno);
			
					var a_downvote = document.createElement("a");
					a_downvote.setAttribute("href", "#");
					a_downvote.setAttribute("class", "downvote");
					var span = document.createElement("span");
					span.setAttribute("class", "vote-btn");
					a_downvote.appendChild(span);
			
				div_vote_right.appendChild(a_upvote);
				div_vote_right.appendChild(span_vote_no);
				div_vote_right.appendChild(a_downvote);
			
				var div_pull_left = document.createElement("div");
				div_pull_left.setAttribute("class", "pull-left snippet-titles");
				
					var h3 = document.createElement("h3");
					var a_qn = document.createElement("a");
					a_qn.setAttribute("href", "singleqn.jsp");
					a_qn.setAttribute("onclick", "recordQn(\"" + qn_no + "\")");
						var question = document.createTextNode(qn);
						a_qn.appendChild(question);
					h3.appendChild(a_qn);
					
					var div_owner = document.createElement("div");
					div_owner.setAttribute("class", "name");
						var text_owner = document.createTextNode(qn_owner);
						div_owner.appendChild(text_owner);
					
					var p = document.createElement("p");
					p.setAttribute("class", "snippet-footer-details");
						var text_dateposted = document.createTextNode(qn_posted_date);
						p.appendChild(text_dateposted);
					
				div_pull_left.appendChild(h3);
				div_pull_left.appendChild(div_owner);
				div_pull_left.appendChild(p);
				
				var div_clearfix = document.createElement("div");
				div_clearfix.setAttribute("class", "clearfix");
				
			div_entry.appendChild(div_vote_right);
			div_entry.appendChild(div_pull_left);
			div_entry.appendChild(div_clearfix);
			
			div_main.appendChild(div_entry);
		}
		
		document.getElementById("snippet-view").appendChild(div_main);
	}
}

function recordQn(qn_no){
	console.log("Selected qn = "+qn_no);
	window.localStorage.singleQn = qn_no;
}