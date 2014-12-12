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
	console.log("Rating page load user");
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
		drawChart();
	}
}

function drawChart(){
	//loadUserDetails();
	console.log("Inside drawChart");
	if (rcvReq.readyState == 4 || rcvReq.readyState == 0) {
		console.log("Clicked register");
		rcvReq.open("POST", 'ViewScoreChart', true);
		rcvReq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		rcvReq.onreadystatechange = drawChartHandler;
		rcvReq.send(null);
	}
}

function drawChartHandler(){
	if (rcvReq.readyState == 4){
		var json = rcvReq.responseText;
		var obj = JSON.parse(json);
		
		var score_avg = parseInt(obj.scoreavg);
		var modscore_avg = parseInt(obj.modscoreavg);
		var userscore = parseInt(window.localStorage.userScore);
		var usermodscore = parseInt(window.localStorage.userModScore);
		
		/*var score_avg = 10;
		var modscore_avg = 35;
		var userscore = 15;
		var usermodscore = 3;*/
		
		console.log("Called drawChart");
	    var data = google.visualization.arrayToDataTable
	    ([
	       ['Score', 'Your Score', 'Avg Score'],
	       ['Score as User',  	   userscore,      score_avg],
	       ['Score as Moderator',  usermodscore,   modscore_avg]
	    ]);

        var options = {
                      title: 'Your Overall Score',
                      hAxis: {title: 'Score',  titleTextStyle: {color: 'red'}}
                     };

        var chart = new google.visualization.ColumnChart(document.getElementById('bottom_pane'));
        chart.draw(data, options);
	}
}