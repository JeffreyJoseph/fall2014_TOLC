<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Login Page</title>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/bootstrap/css/jquery-ui.css" />
	<script src="${pageContext.request.contextPath}/bootstrap/js/jquery-1.9.1.js"></script>
	<script src="${pageContext.request.contextPath}/bootstrap/js/jquery-ui.js"></script>
	<script src="${pageContext.request.contextPath}/bootstrap/js/jquery.validate.js"></script>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/bootstrap/css/bootstrap.min.css">	
	<!-- Optional theme -->
	<link rel="stylesheet" href="${pageContext.request.contextPath}/bootstrap/css/bootstrap-theme.min.css">	
	<!-- Latest compiled and minified JavaScript -->
	<script src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js"></script>	
	<script src="${pageContext.request.contextPath}/resources/js/login.js"></script>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/login.css"></link>
</head>
<body>
<!-- <div id="login-overlay" class="modal-dialog"> -->
      <div class="modal-content">
          <div class="modal-body">
              <div class="row">
              <h2>JavaOverflow</h2>
              </div>
              <div class="row">
                  <div class="col-xs-6">
                      <div class="well">
                          <!-- <form id="loginForm" method="POST" action="/login/" novalidate="novalidate"> -->
                          <div id="loginForm">
                              <div class="form-group">
                                  <label for="username" class="control-label">Username</label>
                                  <input type="text" class="form-control" id="username" name="username" value="" required="" title="Please enter you username" placeholder="example">
                                  <span class="help-block"></span>
                              </div>
                              <div class="form-group">
                                  <label for="password" class="control-label">Password</label>
                                  <input type="password" class="form-control" id="password" name="password" value="" required="" title="Please enter your password">
                                  <span class="help-block"></span>
                              </div>
                              <div id="loginErrorMsg" class="alert alert-error hide">Wrong username or password</div>
                              <button type="submit" class="btn btn-success btn-block" id="button_login">Login</button>
                          </div>
                      </div>
                  </div>
                  <div class="col-xs-6">
                      <div class="well">
	                      <p class="lead">Register now for <span class="text-success">FREE</span></p>
	                      <div class="form-group">
                              <label for="username2" class="control-label">Username</label>
                              <input type="text" class="form-control" id="username2" name="username2" value="" required="" title="Please enter you username" placeholder="example">
                              <span class="help-block"></span>
                          </div>
                          <div class="form-group">
                              <label for="password2" class="control-label">Password</label>
                              <input type="password" class="form-control" id="password2" name="password2" value="" required="" title="Please enter your password">
                              <span class="help-block"></span>
                          </div>
                          <div class="form-group">
                              <label for="password3" class="control-label">Re-enter Password</label>
                              <input type="password" class="form-control" id="password3" name="password3" value="" required="" title="Please re-enter your password">
                              <span class="help-block"></span>
                          </div>
                          Areas of Expertise<br>
	
							<input type="checkbox" class="skills" id="skills" value="Java"/>Java
							<input type="checkbox" class="skills" id="skills" value="C++"/>C++
							<input type="checkbox" class="skills" id="skills" value="C#"/>C#
							<input type="checkbox" class="skills" id="skills" value="SQL"/>SQL
							<input type="checkbox" class="skills" id="skills" value="Python"/>Python<br>
							<input type="checkbox" class="tag_me" id="tag_me" />Willing to get tagged for questions?<br>
							<br>
							<button type="submit" class="btn btn-info btn-block" id="button_register" onclick="click()">Login</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  <!-- </div> -->
</body>
</html>