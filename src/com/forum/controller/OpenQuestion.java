package com.forum.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class OpenQuestion
 */
@WebServlet("/OpenQuestion")
public class OpenQuestion extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public OpenQuestion() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		String scheme = request.getScheme();             // http
	    String serverName = request.getServerName();     // hostname.com
	    int serverPort = request.getServerPort();        // 80
	    String contextPath = request.getContextPath();   // /mywebapp
	    String path = scheme + "://" + serverName + ":" + serverPort + contextPath + "/index.html";
	    
		System.out.println("Entered open qn servlet ="+path);
		response.sendRedirect("index.html");
		return;
		//request.getRequestDispatcher("index.html").forward(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
