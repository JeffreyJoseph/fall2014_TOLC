package com.forum.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.forum.bean.Post;
import com.forum.bean.User;
import com.forum.olc.MongoUtils;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * Servlet implementation class NewPost
 */
@WebServlet("/NewQuestion")
public class NewQuestion extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public NewQuestion() {
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
		StringBuffer data = new StringBuffer();
		String line = null;
		try {
			BufferedReader reader = request.getReader();
		    while ((line = reader.readLine()) != null)
		    	data.append(line);
		} 
		catch (Exception e){
			  
		}
		  
		//System.out.println("servlet = "+data);
		JsonParser parser = new JsonParser();
		JsonObject jsonObj = parser.parse(data.toString()).getAsJsonObject();
		
		//String postId = jsonObj.get("postId").getAsString();
		String userId = jsonObj.get("postOwner").getAsString();
		String postContent = jsonObj.get("postContent").getAsString();
		
		String tags = jsonObj.get("tags").getAsString();
		  StringTokenizer tagsList = new StringTokenizer(tags, ";");
		  List<String> tagSet = new ArrayList<String>();
		  while(tagsList.hasMoreElements()){
			  String str = tagsList.nextElement().toString();
			  if(str.startsWith("null"))
				  tagSet.add(str.substring(4));
			  else
				  tagSet.add(str);
			  //System.out.println("Skill set = "+skillsList.nextElement().toString());
		  }
		
		User user = MongoUtils.getUser(userId);
		  
		Post postObj = new Post(user, postContent, tagSet);
		Post retVal = MongoUtils.addNewPost(postObj);
		
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.setPrettyPrinting();
		Gson gson = gsonBuilder.create();
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		out.println(gson.toJson(retVal));
		
		//JSONObject jObj = JSONObject.fromObject(data.toString());
	}

}
