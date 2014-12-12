package com.forum.bean;

import java.util.ArrayList;
import java.util.List;

public class User {

	private String userId;
	private String password;
	private int score;
	private int moderatorScore;
	private boolean tagme;
	private List<String> userTags;
	private List<String> taggedPosts;
	private List<String> moderatedPosts;

	public User() {

	}

	public User(String userId, String password, List<String> userTags,
			boolean tagme) {
		this.userId = userId;
		this.password = password;
		this.userTags = userTags;
		this.tagme = tagme;
		this.taggedPosts = new ArrayList<String>();
		this.moderatedPosts = new ArrayList<String>();
		this.score = 0;
		this.moderatorScore = 0;
	}

	public boolean isTagme() {
		return tagme;
	}

	public void setTagme(boolean tagme) {
		this.tagme = tagme;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<String> getTaggedPosts() {
		return taggedPosts;
	}

	public void setTaggedPosts(List<String> taggedPosts) {
		this.taggedPosts = taggedPosts;
	}

	public List<String> getUserTags() {
		return userTags;
	}

	public void setUserTags(List<String> userTags) {
		this.userTags = userTags;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public int getModeratorScore() {
		return moderatorScore;
	}

	public void setModeratorScore(int moderatorScore) {
		this.moderatorScore = moderatorScore;
	}

	public List<String> getModeratedPosts() {
		return moderatedPosts;
	}

	public void setModeratedPosts(List<String> moderatedPosts) {
		this.moderatedPosts = moderatedPosts;
	}

}
