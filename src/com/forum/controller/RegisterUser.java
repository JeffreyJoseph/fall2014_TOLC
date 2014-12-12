package com.forum.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.forum.bean.User;
import com.forum.olc.MongoUtils;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * Servlet implementation class RegisterUser
 */
@WebServlet("/RegisterUser")
public class RegisterUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RegisterUser() {
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
		  System.out.println("Entered servlet");
		  
		  String userId = jsonObj.get("user_id").getAsString();
		  String password = jsonObj.get("password").getAsString();
		  boolean tag = jsonObj.get("tag").getAsBoolean();
		  String skills = jsonObj.get("skills").getAsString();
		  StringTokenizer skillsList = new StringTokenizer(skills, ";");
		  List<String> skillSet = new ArrayList<String>();
		  while(skillsList.hasMoreElements()){
			  String str = skillsList.nextElement().toString();
			  if(str.startsWith("null"))
				  skillSet.add(str.substring(4));
			  else
				  skillSet.add(str);
			  //System.out.println("Skill set = "+skillsList.nextElement().toString());
		  }
		  
		  User user = new User(userId, password, skillSet, tag );
		  MongoUtils.addNewUser(user);
		
		//response.sendRedirect("questions.html");
		
		

	}

}
