package com.forum.controller;

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

/**
 * Servlet implementation class OpenAllQuestions
 */
@WebServlet("/OpenAllQuestions")
public class OpenAllQuestions extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public OpenAllQuestions() {
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
		
		  
		List<Post> posts = MongoUtils.fetchAllPosts();		
		  

		/*List<Comment> comments = new ArrayList<Comment>();
		Comment comment1 = new Comment();
		comment1.setCommentContent("Reply 1");
		comments.add(comment1);
		comment1.setCommentContent("Reply 2");
		comments.add(comment1);
		Post post1 = new Post();
		post1.setPostId("1");
		post1.setPostContent("This is Qn 1");
		post1.setCommentsList(comments);
		Post post2 = new Post();
		post2.setPostId("2");
		post2.setPostContent("This is Qn 2");
		post2.setCommentsList(comments);
		List<Post> posts = new ArrayList<Post>();
		posts.add(post1);posts.add(post2);*/
		
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.setPrettyPrinting();
		Gson gson = gsonBuilder.create();
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		out.println(gson.toJson(posts));
	}

}
