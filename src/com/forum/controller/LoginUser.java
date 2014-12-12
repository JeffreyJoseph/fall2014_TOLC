package com.forum.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.forum.olc.MongoUtils;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * Servlet implementation class LoginUser
 */
@WebServlet("/LoginUser")
public class LoginUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginUser() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//System.out.println("Entered login servlet");
		StringBuffer data = new StringBuffer();
		  String line = null;
		  try {
		    BufferedReader reader = request.getReader();
		    while ((line = reader.readLine()) != null)
		    	data.append(line);
		  } catch (Exception e){
			  
		  }
		  
		  JsonParser parser = new JsonParser();
		  JsonObject jsonObj = parser.parse(data.toString()).getAsJsonObject();
		  String userId = jsonObj.get("user_id").getAsString();
		  String password = jsonObj.get("password").getAsString();
		  
		  //System.out.println("Username = "+userId+" Password = "+password);
		  
		  int retVal = 0;
		  if (MongoUtils.isCredentialValid(userId, password))
			  retVal = 1;
		  
		  response.setContentType("application/html");
		  PrintWriter out = response.getWriter();
		  //System.out.println("<!--value:"+ retVal +";-->");
		  out.println("<!--value:"+ retVal +";-->");
	}

}
