package com.forum.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.forum.olc.MongoUtils;

/**
 * Servlet implementation class ViewScoreChart
 */
@WebServlet("/ViewScoreChart")
public class ViewScoreChart extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ViewScoreChart() {
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
	@SuppressWarnings("unchecked")
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		List<Integer> score = MongoUtils.getScoreList();
		List<Integer> moderatorScore = MongoUtils.getModeratorScoreList();
		
		int score_size = score.size();
		int modscore_size = moderatorScore.size();
		int score_sum = 0, modscore_sum = 0, score_avg = 0, modscore_avg = 0;
		
		Iterator<Integer> itr1 = score.iterator();
		while(itr1.hasNext())
			score_sum += itr1.next();
		/*Iterator<Integer> itr2 = moderatorScore.iterator();
		while(itr2.hasNext())
			modscore_sum += itr2.next();*/
		score_avg = score_sum / score_size;
		modscore_avg = modscore_sum / modscore_size;
		
		/*String json = "{" +
				"scoreavg:" + score_avg + "," +
				"modscoreavg:" + modscore_avg +
		"}";*/
		
		JSONObject json_obj = new JSONObject();
		json_obj.put("scoreavg", (Integer)score_avg);
		json_obj.put("modscoreavg", (Integer)modscore_avg);
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		out.println(json_obj);
	}

}
