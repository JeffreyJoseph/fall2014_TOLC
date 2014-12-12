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
		loadAllQns();
	}
}

function loadAllQns(){
	console.log("loadAllQns method");
	
	if (rcvReq.readyState == 4 || rcvReq.readyState == 0) {
		rcvReq.open("POST", 'OpenAllQuestions', true);
		rcvReq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		rcvReq.onreadystatechange = loadQuestionsNew;
		//rcvReq.send(JSON.stringify(json_obj));
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
	    //document.getElementById('bottom_pane').innerHTML = "";
	    //document.getElementById("bottom_pane").appendChild(div);
	}
}

function loadQuestionsNew(){
	
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
					var bold = document.createElement("bold");
					var text_voteno = document.createTextNode(votes);
					bold.appendChild(text_voteno);
					span_vote_no.appendChild(bold);
			
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

function upvoteQn(comment_id){
	console.log("Upvote = "+comment_id);
	document.getElementById("button_upvote"+comment_id).disabled = true;
	document.getElementById("button_downvote"+comment_id).disabled = true;
	var score = parseInt(document.getElementById("txt_post_score"+comment_id).innerHTML);
	document.getElementById("txt_post_score"+comment_id).innerHTML = score + 1;
	
	//var comment_id = window.localStorage.singleQn + "#C" + number;
	//console.log("Upvote = "+comment_id);
	
	var json_obj = {
			"commentId" : comment_id,
			"score" : 1
	}
	
	if (rcvReq.readyState == 4 || rcvReq.readyState == 0) {
		rcvReq.open("POST", 'UpDownVote', true);
		rcvReq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		rcvReq.send(JSON.stringify(json_obj));
	}
}

function downvoteQn(comment_id){
	console.log("Downvote = "+comment_id);
	document.getElementById("button_upvote"+comment_id).disabled = true;
	document.getElementById("button_downvote"+comment_id).disabled = true;
	var score = parseInt(document.getElementById("txt_post_score"+comment_id).innerHTML);
	document.getElementById("txt_post_score"+comment_id).innerHTML = score - 1;
	
	//var comment_id = window.localStorage.singleQn + "#C" + number;
	//console.log("Downvote = "+comment_id);
	
	var json_obj = {
			"commentId" : comment_id,
			"score" : -1
	}
	
	if (rcvReq.readyState == 4 || rcvReq.readyState == 0) {
		rcvReq.open("POST", 'UpDownVote', true);
		rcvReq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		rcvReq.send(JSON.stringify(json_obj));
	}
}

function recordQn(qn_no){
	console.log("Selected qn = "+qn_no);
	window.localStorage.singleQn = qn_no;
}