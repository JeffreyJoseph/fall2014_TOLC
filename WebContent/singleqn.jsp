<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Question</title>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/bootstrap/css/jquery-ui.css" />
	<script src="${pageContext.request.contextPath}/bootstrap/js/jquery-1.9.1.js"></script>
	<script src="${pageContext.request.contextPath}/bootstrap/js/jquery-ui.js"></script>
	<script src="${pageContext.request.contextPath}/bootstrap/js/jquery.validate.js"></script>
	<!-- Optional theme -->
	<link rel="stylesheet" href="${pageContext.request.contextPath}/bootstrap/css/bootstrap-theme.min.css">	
	
	<!-- Bootstrap Core CSS -->
    <link href="${pageContext.request.contextPath}/bootstrap2/css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="${pageContext.request.contextPath}/bootstrap2/css/sb-admin.css" rel="stylesheet">
    <!-- Morris Charts CSS -->
    <link href="${pageContext.request.contextPath}/bootstrap2/css/plugins/morris.css" rel="stylesheet">
    <!-- Custom Fonts -->
    <link href="${pageContext.request.contextPath}/bootstrap2/font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <!-- jQuery -->
    <script src="${pageContext.request.contextPath}/bootstrap2/js/jquery.js"></script>
    <!-- Bootstrap Core JavaScript -->
    <script src="${pageContext.request.contextPath}/bootstrap2/js/bootstrap.min.js"></script>
    
	<script src="${pageContext.request.contextPath}/resources/js/singleqn.js"></script>
	
	<script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1','packages':['corechart']}]}"></script>
    
    <link media="all" type="text/css" rel="stylesheet" href="//yandex.st/highlightjs/7.5/styles/tomorrow.min.css">
    <!-- <link media="all" type="text/css" rel="stylesheet" href="http://snippetrepo.com/css/bootstrap-responsive.min.css"> -->
    <!-- <link media="all" type="text/css" rel="stylesheet" href="http://snippetrepo.com/css/style.css?11may14"> -->
    <link media="all" type="text/css" rel="stylesheet" href="http://snippetrepo.com/css/foundation-icons.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/allquestions.css">
	
</head>
<body>

	<div id="wrapper">
	<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
	
			<div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="login.jsp">JavaOverflow</a>
            </div>
            
            <!-- Top Menu Items -->
            <ul class="nav navbar-right top-nav">
            <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user"></i><text id="logged_as"></text> <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="login.jsp"><i class="fa fa-fw fa-power-off"></i> Log Out</a>
                        </li>
                    </ul>
                </li>
            </ul>
            
	        <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav side-nav">
                    <li>
                        <a href="questions.jsp"><i class="fa fa-fw fa-dashboard"></i> Dashboard</a>
                    </li>
                    <li>
                        <a href="rating.jsp"><i class="fa fa-fw fa-bar-chart-o"></i> My Rating</a>
                    </li>
                    <li>
                        <a href="allquestions.jsp"><i class="fa fa-fw fa-edit"></i> All Questions</a>
                    </li>
                    <li>
                        <a href="taggedqns.jsp"><i class="fa fa-fw fa-desktop"></i> Tagged Questions</a>
                    </li>
                    <li>
                        <a href="moderatedqns.jsp"><i class="fa fa-fw fa-wrench"></i> Moderated Questions</a>
                    </li>
                    <li>
                        <a href="newquestion.jsp"><i class="fa fa-fw fa-file"></i> Enter New Question</a>
                    </li>
                    <li>
                        <a href="searchforum.jsp"><i class="fa fa-fw fa-table"></i> Related Questions</a>
                    </li>
                </ul>
            </div>

	</nav>
	
	        <div id="page-wrapper">

            <div class="container-fluid">
            
                <!-- Page Heading -->
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">
                            Question
                        </h1>
                        <ol class="breadcrumb">
                            <li>
                                <i class="fa fa-dashboard"></i>  <a href="questions.jsp">Dashboard</a>
                            </li>
                            <li class="active">
                                <i class="fa fa-bar-chart-o"></i> Question
                            </li>
                        </ol>
                    </div>
                </div>
                <!-- /.row -->
                
                <div class="row">
                    <div class="col-lg-3">
		                <div class="form-group">
		                     <label>Tagged Users</label>
		                     <select class="form-control" id="tagged_users">
		                        
		                     </select>
		                </div>
		             </div>
		             
		             <div class="col-lg-3">
		                <div class="form-group">
		                     <label>Moderators</label>
		                     <select class="form-control" id="tagged_moderators" onchange="changeModScore(this.value)">
		                        
		                     </select>
		                </div>
		             </div>
		             
		             <div class="col-lg-2">
		             		<form role="form">

                            <fieldset disabled>
                                <div class="form-group">
                                    <label for="disabledSelect">Moderator Score</label>
                                    <input class="form-control" id="disabledInput" type="text" placeholder="" disabled>
                                </div>
                            </fieldset>

                        </form>
		             </div>
		             <div class="col-lg-2">
		             		<form role="form">

                            <fieldset disabled>
                                <div class="form-group">
                                    <label for="disabledSelect">Your Score</label>
                                    <input class="form-control" id="disabledInput2" type="text" placeholder="" disabled>
                                </div>
                            </fieldset>

                        </form>
		             </div>		             
		        </div>
                
                <div class="well">
                This question comes under the topic:
					<input type="checkbox" class="skills" id="Java" value="Java"/>Java
					<input type="checkbox" class="skills" id="C++" value="C++"/>C++
					<input type="checkbox" class="skills" id="C#" value="C#"/>C#
					<input type="checkbox" class="skills" id="SQL" value="SQL"/>SQL
					<input type="checkbox" class="skills" id="Python" value="Python"/>Python<br>
					<button type="button" class="btn btn-info" onclick="relatedQns()">Search Related Questions</button>
                </div>
                
                <div class="well">
				    <div id="snippet-inside">
				      <h3 id="post_question"></h3>
				        <div class="snippet-inside-det">
				          <div id="snippet-details">
				            Posted By: <span id="snippet-det2"> </span><br>
				            <span id="snippet-det"> </span>
				          </div>
				        </div>
				        
				        <div class="vote-right">
				            <a class="upvote" onclick="upvoteQn()">
				            <span class="vote-btn"></span>
				            </a>
				            <span class="vote-number" id="qn_votes"></span>
				            <a class="downvote" onclick="downvoteQn()">
				            <span class="vote-btn"></span>
				            </a>
				        </div>
				     </div>
				     
				     <div class="comments" id="comments">
				     <h3>Comments</h3>
							<!-- <div id="snippet-inside">
					        <div class="comments-head">
								      <div class="name pull-left">
							            <a href="http://snippetrepo.com/users/felics">felics</a> posted
							          </div>
					          <div class="vote-right">
					                  <a href="http://snippetrepo.com/snippets/one-line-browser-notepad/votes" class="upvote">
					                          <span class="vote-btn"></span>
					                      </a>
					          <span class="vote-number">57</span>
					          <a href="http://snippetrepo.com/snippets/one-line-browser-notepad/votes" class="downvote">
					                          <span class="vote-btn"></span>
					          </a>
					        </div>
					        </div>
					                
					        <div class="clearfix"></div>
					            
					        <div id="comment-body" style="width: 90%;">
					            <p>Comment of P1  Comment of P1</p>
					        </div>
							<br>
							<div class="col-lg-3">
		                		<div class="form-group">
		                     			<select class="form-control" id="tagged_users">		                        
		                                </select>
		                       </div>		                       
		                    </div>
		                    <div class="col-lg-8">
		                		<div class="form-group has-error">
		                     			<input type="text" class="form-control" id="inputError" placeholder="Error URL if any">
		                       </div>		                       
		                    </div>                    
								
					      </div>
						  <br><hr/> -->
				     </div>	
				     
				     
				     <div id="snippet-inside">        
                		<div class="clearfix"></div><br/>
                		<textarea id="text_newcomment"></textarea>
      				    <a href="singleqn.jsp" onclick="newComment()">Add comment</a>	
      				 </div>
             	</div>
            	<!-- End of well -->
             
          </div>
          <!-- /.container-fluid -->

        </div>
        <!-- /#page-wrapper -->
	</div> <!-- End of wrapper -->
</body>
</html>