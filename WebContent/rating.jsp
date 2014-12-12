<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>My rating</title>
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
    
	<script src="${pageContext.request.contextPath}/resources/js/rating.js"></script>
	
	<script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1','packages':['corechart']}]}"></script>
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
                    <li class="active">
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
                            My Rating
                        </h1>
                        <ol class="breadcrumb">
                            <li>
                                <i class="fa fa-dashboard"></i>  <a href="questions.jsp">Dashboard</a>
                            </li>
                            <li class="active">
                                <i class="fa fa-bar-chart-o"></i> My Rating
                            </li>
                        </ol>
                    </div>
                </div>
                <!-- /.row -->
                
                <div class="row">
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-comments fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge" id="user_score"></div>
                                        <div>Score as User!</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-green">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-tasks fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge" id="moderator_score"></div>
                                        <div>Score as Moderator!</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /.row -->
                
                
                <div class="row">
                    <div class="col-lg-6">
                        <div class="panel panel-danger">
                            <div class="panel-heading">
                                <h3 class="panel-title">Your Rating Chart</h3>
                            </div>
                            <div class="panel-body" id="bottom_pane">
                                
                            </div>                            
                        </div>
                    </div>
                    <!-- /.col-lg-6 -->
                </div>
                
                <div class="well">

                </div>
            </div>
            <!-- /.container-fluid -->

        </div>
        <!-- /#page-wrapper -->
	</div> <!-- End of wrapper -->
</body>
</html>