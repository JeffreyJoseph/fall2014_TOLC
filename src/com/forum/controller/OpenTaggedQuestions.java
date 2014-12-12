package com.forum.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.forum.bean.Post;
import com.forum.olc.MongoUtils;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * Servlet implementation class OpenTaggedQuestions
 */
@WebServlet("/OpenTaggedQuestions")
public class OpenTaggedQuestions extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public OpenTaggedQuestions() {
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
		//System.out.println("Inside servlet OpenTaggedQuestions");
		StringBuffer data = new StringBuffer();
		String line = null;
		try {
			BufferedReader reader = request.getReader();
		    while ((line = reader.readLine()) != null)
		    	data.append(line);
		} 
		catch (Exception e){
			  
		}
		
		JsonParser parser = new JsonParser();
		JsonObject jsonObj = parser.parse(data.toString()).getAsJsonObject();
		
		String userId = jsonObj.get("user_id").getAsString();
		int signal = jsonObj.get("signal").getAsInt();
		
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.setPrettyPrinting();
		Gson gson = gsonBuilder.create();
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		
		if(signal==1){
			List<Post> posts = MongoUtils.fetchUserTaggedPosts(userId);
			out.println(gson.toJson(posts));
		}
		else if(signal==2){
			List<Post> posts = MongoUtils.fetchUserModeratedPosts(userId);
			out.println(gson.toJson(posts));
		}
	}

}
