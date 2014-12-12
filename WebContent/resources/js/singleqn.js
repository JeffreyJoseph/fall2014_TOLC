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
var g_moderator = false;
var g_counter = 1;

function increment(){
	g_counter += 1;
}


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
		loadQuestion();
	}
}

function addOption(selectbox, text, value, counter, selected)
{
	var optn = document.createElement("option");
	optn.setAttribute("class", text+counter);
	optn.setAttribute("id", text+counter);
	if(selected)
		optn.setAttribute("selected", "selected");
	optn.text = text;
	optn.value = value;
	selectbox.options.add(optn);
}

function loadQuestion(){
	
	g_counter = 1;
	var obj = window.localStorage.singleQn;	
	//document.getElementById("txt_qn_no").value = obj;
	//document.getElementById("bottom_pane_inner").innerHTML = "";
	
	if (rcvReq.readyState == 4 || rcvReq.readyState == 0) {
		//console.log("Clicked post"+comment+" Number "+number);
		rcvReq.open("POST", 'OpenAllQuestions', true);
		rcvReq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		rcvReq.onreadystatechange = displayQuestionHandler;
		rcvReq.send(null);		
	}
	
}

function newComment(){
	
	var qnNo = window.localStorage.singleQn;
	var commentId = 1;
	var commentOwner = window.localStorage.userId;	
	var commentContent = document.getElementById("text_newcomment").value;
	
	var json_obj = {
			"qnNo" : qnNo,
			"commentId" : commentId,
			"commentOwner" : commentOwner,
			"commentContent" : commentContent
	}
	
	if (rcvReq.readyState == 4 || rcvReq.readyState == 0) {
		rcvReq.open("POST", 'NewComment', true);
		rcvReq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		//rcvReq.onreadystatechange = newCommentHandler; 
		rcvReq.send(JSON.stringify(json_obj));
		
	}
}

function displayNewComment(comment){
	
	var div_snippet_inside = document.createElement("div");
	div_snippet_inside.setAttribute("class", "snippet-entry");
	
		var div_comments_head = document.createElement("div");
		div_comments_head.setAttribute("class", "comments-head");
		
			var div_name_pullhead = document.createElement("div");
			div_name_pullhead.setAttribute("class", "name pull-left");
				var text_owner = document.createTextNode("'"+comment.commentOwner.userId+"' posted");
				div_name_pullhead.appendChild(text_owner);
				
			var div_vote_right = document.createElement("div");
			div_vote_right.setAttribute("class", "vote-right");

				var a_upvote = document.createElement("a");
				//a_upvote.setAttribute("href", "#");
				a_upvote.setAttribute("class", "upvote");
				a_upvote.setAttribute("id", "button_upvote"+comment.commentId);
				a_upvote.setAttribute("onclick", "upvote('" + comment.commentId + "')");
				var span = document.createElement("span");
				span.setAttribute("class", "vote-btn");
				a_upvote.appendChild(span);

				/*var span_vote_no = document.createElement("span");
				span_vote_no.setAttribute("id", "txt_score"+comment.commentId);
				var text_voteno = document.createTextNode(comment.upVotes-comment.downVotes);
				span_vote_no.appendChild(text_voteno);*/
				
				var span_vote_no = document.createElement("span");
				span_vote_no.setAttribute("id", "txt_score"+comment.commentId);
				var text_voteno = document.createElement("p");
				var bold = document.createElement("b");
				text_voteno.setAttribute("id", "txt_post_score"+comment.commentId);
				bold.appendChild(text_voteno);
				span_vote_no.appendChild(bold);

				var a_downvote = document.createElement("a");
				//a_downvote.setAttribute("href", "#");
				a_downvote.setAttribute("class", "downvote");
				a_downvote.setAttribute("id", "button_downvote"+comment.commentId);
				a_downvote.setAttribute("onclick", "downvote('" + comment.commentId + "')");
				var span = document.createElement("span");
				span.setAttribute("class", "vote-btn");
				a_downvote.appendChild(span);

			div_vote_right.appendChild(a_upvote);
			div_vote_right.appendChild(span_vote_no);
			div_vote_right.appendChild(a_downvote);
			
		div_comments_head.appendChild(div_name_pullhead);
		div_comments_head.appendChild(div_vote_right);
		
		var div_clearfix = document.createElement("div");
		div_clearfix.setAttribute("class", "clearfix");
		
		var div_comment_body = document.createElement("div");
		div_comment_body.setAttribute("class", "comment-body");		
			var p = document.createElement("p");
				var text_comment = document.createTextNode(comment.commentContent);
				p.appendChild(text_comment);
		div_comment_body.appendChild(p);
		
		var br = document.createElement("br");
		
		var div_col_lg3 = document.createElement("div");
		div_col_lg3.setAttribute("class", "col-lg-3");
		
			var div_form_group = document.createElement("div");
			div_form_group.setAttribute("class", "form-group");
			
		    var dropdown_error = document.createElement("select");
		    dropdown_error.setAttribute("class", "form-control");
		    dropdown_error.setAttribute("id", "dd_errortype"+comment.commentId);
		    var errorTypes = new Array("No error", "Operational", "Conceptual");
		    for (var i=0; i < errorTypes.length;++i){
		    	var selected = false;
		    	if(comment.errorType!=null && comment.errorType==errorTypes[i])
		    		selected = true;
		    	addOption(dropdown_error, errorTypes[i], errorTypes[i], comment.commentId, selected);    	
		    }
		    if(g_moderator || comment.errorType=="Operational" || comment.errorType=="Conceptual")
		    	div_form_group.appendChild(dropdown_error);
		div_col_lg3.appendChild(div_form_group);
		
		var div_col_lg8 = document.createElement("div");
		div_col_lg8.setAttribute("class", "col-lg-8");
		
			var div_form_grouperror = document.createElement("div");
			div_form_grouperror.setAttribute("class", "form-group has-error");
			
		    var txt_errorUrl = document.createElement("input");
		    txt_errorUrl.setAttribute("type", "text");
		    txt_errorUrl.setAttribute("class", "form-control");
		    txt_errorUrl.setAttribute("style", "color:red");
		    txt_errorUrl.setAttribute("id", "txt_errorUrl"+comment.commentId);
		    txt_errorUrl.setAttribute("placeholder", "Error URL if any");
		    txt_errorUrl.setAttribute("onchange", "onChangeURL('" + comment.commentId + "')");
		    if(comment.errorLink!=null) txt_errorUrl.setAttribute("value", comment.errorLink);
		    
		    if(!g_moderator){
		    	dropdown_error.setAttribute("disabled", "disabled");
		        txt_errorUrl.setAttribute("disabled", "disabled");    	
		    }
		    if(g_moderator || comment.errorType=="Operational" || comment.errorType=="Conceptual")
		    	div_form_grouperror.appendChild(txt_errorUrl);
		div_col_lg8.appendChild(div_form_grouperror);
		
	div_snippet_inside.appendChild(div_comments_head);
	div_snippet_inside.appendChild(div_clearfix);
	div_snippet_inside.appendChild(div_comment_body);
	div_snippet_inside.appendChild(br);
	div_snippet_inside.appendChild(div_col_lg3);
	div_snippet_inside.appendChild(div_col_lg8);
	
	var br1 = document.createElement("br");
	var hr = document.createElement("hr");
	
	document.getElementById("comments").appendChild(div_snippet_inside);
	document.getElementById("comments").appendChild(br1);
}

function displayQuestionHandler(){
	if (rcvReq.readyState == 4){
		
	
		var json = rcvReq.responseText;
		//console.log("JSON = "+json)
		var obj = JSON.parse(json);
	
		var count = obj.length;
		var x = 0;
		for(;x<count;x++){
			if(obj[x].postId == window.localStorage.singleQn)
				break;
		}
	
		var userId = window.localStorage.userId;
		var mod_list_dropdown = document.getElementById("tagged_moderators");
		while(mod_list_dropdown.options.length > 0){                
			mod_list_dropdown.remove(0);
		}
		var mod_list = obj[x].moderatorList;
		for (var i=0; i < mod_list.length;++i){
			addOption(mod_list_dropdown, mod_list[i].userId, mod_list[i].moderatorScore, 0, false);
			if(userId == mod_list[i].userId)
				g_moderator = true;
		}
		document.getElementById("disabledInput").value = mod_list[0].moderatorScore;		
		document.getElementById(obj[x].tagList[0]).checked = true;
		document.getElementById("disabledInput2").value = obj[x].postOwner.score;
		
		var user_list_dropdown = document.getElementById("tagged_users");
		while(user_list_dropdown.options.length > 0){                
			user_list_dropdown.remove(0);
		}
		var taggedUsers = obj[x].taggedUsersList;
		var taggedUsers_len = taggedUsers.length;
		for(var index=0; index < taggedUsers.length; index++){
			addOption(user_list_dropdown, taggedUsers[index].userId, taggedUsers[index].userId, 0, false);
		}
	
		console.log("Question = "+obj[x].postContent);
		document.getElementById("post_question").innerHTML = obj[x].postContent;
		document.getElementById("snippet-det").innerHTML = obj[x].datePosted;
		document.getElementById("snippet-det2").innerHTML = obj[x].postOwner.userId;
		document.getElementById("qn_votes").innerHTML = obj[x].upVotes - obj[x].downVotes;
		/*document.getElementById("txt_post_inp").hidden = true;
		document.getElementById("txt_post").innerHTML = obj[x].postContent;*/
		var comment_count = obj[x].commentsList.length;
		var index = 0;
		for (index = 0; index<comment_count; index++){
			displayNewComment(obj[x].commentsList[index]);
			//document.getElementById("txt_post"+counter).value = obj[x].commentsList[index].commentContent;
		}
		for (index = 0; index<comment_count; index++){
			document.getElementById("txt_post_score"+obj[x].commentsList[index].commentId).innerHTML = obj[x].commentsList[index].upVotes - obj[x].commentsList[index].downVotes;
		}
		delayedAlert();
	}
}

function onChangeURL(comment_id){
	var userId = window.localStorage.userId;
	var errorType = document.getElementById("dd_errortype"+comment_id).value;
	var errorUrl = document.getElementById("txt_errorUrl"+comment_id).value;
	//var comment_id = window.localStorage.singleQn + "#C" + comment_number;
	
	var json_obj = {
			"user_id"   : userId,
			"commentId" : comment_id,
			"errorType" : errorType,
			"errorUrl"  : errorUrl
	}
	
	if (rcvReq.readyState == 4 || rcvReq.readyState == 0) {
		rcvReq.open("POST", 'NewError', true);
		rcvReq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		//rcvReq.onreadystatechange = handleStageContent; 
		rcvReq.send(JSON.stringify(json_obj));
	} 
}

function upvote(comment_id){
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

function downvote(comment_id){
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

function upvoteQn(){
	var score = parseInt(document.getElementById("qn_votes").innerHTML);
	document.getElementById("qn_votes").innerHTML = score + 1;
	var qnNo = window.localStorage.singleQn;
	
	//var comment_id = window.localStorage.singleQn + "#C" + number;
	//console.log("Upvote = "+comment_id);
	
	var json_obj = {
			"postId" : qnNo,
			"score" : 1
	}
	
	if (rcvReq.readyState == 4 || rcvReq.readyState == 0) {
		rcvReq.open("POST", 'UpDownVoteQn', true);
		rcvReq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		rcvReq.send(JSON.stringify(json_obj));
	}
}

function downvoteQn(){
	console.log("Downvote = "+comment_id);
	var score = parseInt(document.getElementById("qn_votes").innerHTML);
	document.getElementById("qn_votes").innerHTML = score - 1;
	var qnNo = window.localStorage.singleQn;
	
	//var comment_id = window.localStorage.singleQn + "#C" + number;
	//console.log("Downvote = "+comment_id);
	
	var json_obj = {
			"postId" : qnNo,
			"score" : -1
	}
	
	if (rcvReq.readyState == 4 || rcvReq.readyState == 0) {
		rcvReq.open("POST", 'UpDownVoteQn', true);
		rcvReq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		rcvReq.send(JSON.stringify(json_obj));
	}
}

function changeModScore(value){
	document.getElementById("disabledInput").value = value;
}

//Smart scoring
var timeoutID;

function delayedAlert() {
  timeoutID = window.setTimeout(timerScore, 60000);
}
 
function timerScore() {
	clearTimeout(timeoutID);
	var userId = window.localStorage.userId;
	var json_obj = {
			"user_id" : userId
	}
	var score = parseInt(document.getElementById("qn_votes").innerHTML);
	document.getElementById("qn_votes").innerHTML = score + 1;
	
	if (rcvReq.readyState == 4 || rcvReq.readyState == 0) {
		rcvReq.open("POST", 'TimerScore', true);
		rcvReq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		rcvReq.send(JSON.stringify(json_obj));
	}
	//MongoUtils.timerScore(userId);
}

//Related Qns search
function relatedQns(){
	window.location.replace("searchforum.jsp");
}
