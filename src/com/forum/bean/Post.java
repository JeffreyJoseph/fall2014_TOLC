package com.forum.bean;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

public class Post {

	private String postId;
	private User postOwner;
	private List<User> moderatorList = new ArrayList<User>();
	private String postContent;
	private Timestamp datePosted;
	private int upVotes;
	private int downVotes;
	private List<String> tagList = new ArrayList<String>();
	private List<User> taggedUsersList = new ArrayList<User>();
	private List<Comment> commentsList = new ArrayList<Comment>();
	private Set<String> keywordsList = new TreeSet<String>();
	private boolean isOpen;

	public Post() {

	}

	public Post(User postOwner, String postContent, List<String> tagList) {
		this.postOwner = postOwner;
		this.postContent = postContent;
		this.tagList = tagList;
		this.datePosted = new Timestamp(new Date().getTime());
		this.upVotes = 0;
		this.downVotes = 0;
		this.setOpen(true);
	}

	public Timestamp getDatePosted() {
		return datePosted;
	}

	public void setDatePosted(Timestamp datePosted) {
		this.datePosted = datePosted;
	}

	public List<String> getTagList() {
		return tagList;
	}

	public void setTagList(List<String> tagList) {
		this.tagList = tagList;
	}

	public List<User> getTaggedUsersList() {
		return taggedUsersList;
	}

	public void setTaggedUsersList(List<User> taggedUsersList) {
		this.taggedUsersList = taggedUsersList;
	}

	public List<Comment> getCommentsList() {
		return commentsList;
	}

	public void setCommentsList(List<Comment> commentsList) {
		this.commentsList = commentsList;
	}

	public String getPostContent() {
		return postContent;
	}

	public void setPostContent(String postContent) {
		this.postContent = postContent;
	}

	public String getPostId() {
		return postId;
	}

	public void setPostId(String postId) {
		this.postId = postId;
	}

	public User getPostOwner() {
		return postOwner;
	}

	public void setPostOwner(User postOwner) {
		this.postOwner = postOwner;
	}

	public List<User> getModeratorList() {
		return moderatorList;
	}

	public void setModeratorList(List<User> moderatorList) {
		this.moderatorList = moderatorList;
	}

	public Set<String> getKeywordsList() {
		return keywordsList;
	}

	public void setKeywordsList(Set<String> keywordsList) {
		this.keywordsList = keywordsList;
	}

	public int getUpVotes() {
		return upVotes;
	}

	public void setUpVotes(int upVotes) {
		this.upVotes = upVotes;
	}

	public int getDownVotes() {
		return downVotes;
	}

	public void setDownVotes(int downVotes) {
		this.downVotes = downVotes;
	}

	public boolean isOpen() {
		return isOpen;
	}

	public void setOpen(boolean isOpen) {
		this.isOpen = isOpen;
	}

}
