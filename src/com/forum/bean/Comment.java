package com.forum.bean;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Comment {

	private String commentId;
	private User commentOwner;
	private String commentContent;
	private int upVotes;
	private int downVotes;
	private Timestamp datePosted;
	private List<Comment> commentsList = new ArrayList<Comment>();
	private String errorType;
	private String errorLink;

	public Comment() {

	}

	public Comment(User commentOwner, String commentContent) {
		this.commentOwner = commentOwner;
		this.commentContent = commentContent;
		this.datePosted = new Timestamp(new Date().getTime());
		this.errorType = "";
		this.errorLink = "";
		this.upVotes = 0;
		this.downVotes = 0;
	}

	public String getCommentContent() {
		return commentContent;
	}

	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
	}

	public String getErrorLink() {
		return errorLink;
	}

	public void setErrorLink(String errorLink) {
		this.errorLink = errorLink;
	}

	public String getErrorType() {
		return errorType;
	}

	public void setErrorType(String errorType) {
		this.errorType = errorType;
	}

	public String getCommentId() {
		return commentId;
	}

	public void setCommentId(String commentId) {
		this.commentId = commentId;
	}

	public User getCommentOwner() {
		return commentOwner;
	}

	public void setCommentOwner(User commentOwner) {
		this.commentOwner = commentOwner;
	}

	public List<Comment> getCommentsList() {
		return commentsList;
	}

	public void setCommentsList(List<Comment> commentsList) {
		this.commentsList = commentsList;
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

	public Timestamp getDatePosted() {
		return datePosted;
	}

	public void setDatePosted(Timestamp datePosted) {
		this.datePosted = datePosted;
	}
}
