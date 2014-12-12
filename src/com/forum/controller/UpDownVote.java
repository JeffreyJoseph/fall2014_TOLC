package com.forum.controller;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.forum.olc.MongoUtils;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * Servlet implementation class UpDownVote
 */
@WebServlet("/UpDownVote")
public class UpDownVote extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UpDownVote() {
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
		
		String commentId = jsonObj.get("commentId").getAsString();
		int score =  jsonObj.get("score").getAsInt();
		
		if(score==1){
			MongoUtils.incrementCommentScore(commentId);
		}
		else if(score==-1){
			MongoUtils.decrementCommentScore(commentId);
		}
	}

}
