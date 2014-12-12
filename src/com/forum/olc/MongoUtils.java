package com.forum.olc;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.TreeSet;

import com.forum.bean.Comment;
import com.forum.bean.Post;
import com.forum.bean.User;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.util.JSON;

public class MongoUtils {

	private static MongoClient mongoClient;
	private static DB db;
	private static DBCollection postCollection;
	private static DBCollection userCollection;
	private static DBCollection sequenceCollection;

	private static final String ID = "_id";

	static {

		try {

			mongoClient = new MongoClient("54.148.113.6", 27017);
			db = mongoClient.getDB("olc");
			postCollection = db.getCollection("posts");
			userCollection = db.getCollection("users");
			sequenceCollection = db.getCollection("sequence");
			if (sequenceCollection.findOne() == null) {
				String jsonString = "{\"post\":1,\"comment\":1}";
				DBObject dbObject = (DBObject) JSON.parse(jsonString);
				sequenceCollection.save(dbObject);
			}
			User moderator = new User("moderator", "moderator",
					new ArrayList<String>(), false);
			addNewUser(moderator);

		} catch (UnknownHostException e) {
			e.printStackTrace();
		}

	}

	public static void addNewUser(User user) {

		String jsonString = convertObjToJson(user);
		System.out.println(jsonString);
		DBObject dbObject = (DBObject) JSON.parse(jsonString);
		dbObject.put(ID, user.getUserId());
		userCollection.save(dbObject);
	}

	public static Post addNewPost(Post post) {

		DBObject dbObject = sequenceCollection.findOne();
		Integer postNo = (Integer) dbObject.get("post");
		post.setKeywordsList(generateKeywords(post.getPostContent()));
		post.setPostId("P" + postNo);
		dbObject.put("post", ++postNo);
		sequenceCollection.save(dbObject);

		post.getModeratorList().add(getUser("moderator"));
		String jsonString = convertObjToJson(post);
		dbObject = (DBObject) JSON.parse(jsonString);
		dbObject.put(ID, post.getPostId());
		postCollection.save(dbObject);
		if (post.getTagList()!=null && post.getTagList().size()>0)
			getTaggedUsers(post.getPostId(), post.getTagList().get(0));

		dbObject = postCollection.findOne(new BasicDBObject(ID, post
				.getPostId()));
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.setPrettyPrinting();
		Gson gson = gsonBuilder.create();
		return (gson.fromJson(convertObjToJson(dbObject), Post.class));

	}

	public static User getUser(String userId) {

		DBObject dbObject = userCollection
				.findOne(new BasicDBObject(ID, userId));
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.setPrettyPrinting();
		Gson gson = gsonBuilder.create();
		return (gson.fromJson(convertObjToJson(dbObject), User.class));
	}

	public static Post getPost(String postId) {

		DBObject dbObject = postCollection
				.findOne(new BasicDBObject(ID, postId));
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.setPrettyPrinting();
		Gson gson = gsonBuilder.create();
		return (gson.fromJson(convertObjToJson(dbObject), Post.class));
	}

	public static List<Post> getSimilarPosts(String postId) {

		Post post = getPost(postId);
		List<Post> postList = new ArrayList<Post>();
		Set<String> keywordsList = post.getKeywordsList();
		int keywordCount = (keywordsList.size() * 70) / 100;
		DBCursor dbCursor = postCollection.find();
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.setPrettyPrinting();
		Gson gson = gsonBuilder.create();
		for (DBObject dbObject : dbCursor) {
			post = gson.fromJson(convertObjToJson(dbObject), Post.class);
			if (!post.getPostId().equals(postId)) {
				int count = 0;
				for (String keyword : post.getKeywordsList()) {
					if (keywordsList.contains(keyword))
						count++;
				}
				if (count > 5 && count >= keywordCount)
					postList.add(post);
			}
		}
		if (postList.size() > 1)
			Collections.sort(postList, new Comparator<Post>() {

				@Override
				public int compare(Post post1, Post post2) {
					return post2.getDatePosted().compareTo(
							post1.getDatePosted());
				}
			});
		return postList;
	}

	private static Set<String> generateKeywords(String content) {
		Set<String> keywords = new TreeSet<String>();
		String[] wordList = content.split(" ");
		for (String word : wordList)
			if (!StopWords.isStopWord(word.trim()))
				keywords.add(word);
		return keywords;
	}

	public static boolean checkUserExists(String userId) {

		DBObject dbObject = userCollection
				.findOne(new BasicDBObject(ID, userId));
		return (dbObject != null);
	}

	public static boolean isCredentialValid(String userId, String password) {
		DBObject dbObject = userCollection
				.findOne(new BasicDBObject(ID, userId));
		return (dbObject != null && dbObject.get("password").equals(password));
	}

	public static Comment addCommentToPost(String postId, Comment comment) {

		DBObject dbObject = sequenceCollection.findOne();
		Integer commentNo = (Integer) dbObject.get("comment");
		comment.setCommentId("C" + commentNo);
		dbObject.put("comment", ++commentNo);
		sequenceCollection.save(dbObject);

		DBObject postObject = postCollection.findOne(new BasicDBObject(ID,
				postId));
		comment.setCommentId(postId + "#" + comment.getCommentId());
		BasicDBList commentsList = (BasicDBList) postObject.get("commentsList");
		BasicDBObject commentObject = (BasicDBObject) JSON
				.parse(convertObjToJson(comment));
		commentObject.put(ID, comment.getCommentId());
		commentsList.add(commentObject);
		postCollection.save(postObject);
		return comment;
	}

	public static Comment addCommentToComment(String parentCommentId,
			Comment child) {

		DBObject dbObject = sequenceCollection.findOne();
		Integer commentNo = (Integer) dbObject.get("comment");
		child.setCommentId("C" + commentNo);
		dbObject.put("comment", ++commentNo);
		sequenceCollection.save(dbObject);

		String[] commentTree = parentCommentId.split("#");
		DBObject commentObject = postCollection.findOne(new BasicDBObject(ID,
				commentTree[0]));
		DBObject postObject = commentObject;
		BasicDBList commentsList = (BasicDBList) commentObject
				.get("commentsList");
		String commentId = commentTree[0];

		for (int i = 1; i < commentTree.length; i++) {
			commentId += "#" + commentTree[i];
			for (Object comment : commentsList) {
				commentObject = (BasicDBObject) comment;
				if (commentObject.get(ID).equals(commentId))
					break;
			}
			commentsList = (BasicDBList) commentObject.get("commentsList");
		}
		child.setCommentId(parentCommentId + "#" + child.getCommentId());
		commentObject = (BasicDBObject) JSON.parse(convertObjToJson(child));
		commentObject.put(ID, child.getCommentId());
		commentsList.add(commentObject);
		postCollection.save(postObject);
		return child;
	}

	public static List<Post> fetchAllPosts() {
		List<Post> postList = new ArrayList<Post>();
		DBCursor dbCursor = postCollection.find();
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.setPrettyPrinting();
		Gson gson = gsonBuilder.create();
		for (DBObject dbObject : dbCursor) {
			postList.add(gson.fromJson(convertObjToJson(dbObject), Post.class));
		}
		Collections.sort(postList, new Comparator<Post>() {

			@Override
			public int compare(Post o1, Post o2) {
				return (o2.getDatePosted().compareTo(o1.getDatePosted()));
			}
		});
		return postList;
	}

	private static void addTaggedUsersToPost(String postId, List<User> userList) {
		DBObject postObject = postCollection.findOne(new BasicDBObject(ID,
				postId));
		BasicDBList dbList = (BasicDBList) postObject.get("taggedUsersList");
		for (User user : userList)
			dbList.add(JSON.parse(convertObjToJson(user)));
		postCollection.save(postObject);
	}

	private static void addPostIdToUser(String postId, List<User> userList) {
		for (User user : userList) {
			DBObject userObject = userCollection.findOne(new BasicDBObject(ID,
					user.getUserId()));
			BasicDBList dbList = (BasicDBList) userObject.get("taggedPosts");
			dbList.add(postId);
			userCollection.save(userObject);
		}
	}

	public static List<User> getTaggedUsers(String postId, String tag) {
		List<User> taggedUsersList = new ArrayList<User>();
		Post post = getPost(postId);
		DBCursor dbCursor = userCollection.find();
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.setPrettyPrinting();
		Gson gson = gsonBuilder.create();
		for (DBObject dbObject : dbCursor) {
			BasicDBList dbList = (BasicDBList) dbObject.get("userTags");
			for (Object userTag : dbList) {
				if (userTag.equals(tag)) {
					User user = gson.fromJson(convertObjToJson(dbObject),
							User.class);
					if (!user.getTaggedPosts().contains(postId)
							&& !user.getUserId().equals(
									post.getPostOwner().getUserId())
							&& user.isTagme()
							&& user.getTaggedPosts().size() < 10)
						taggedUsersList.add(user);
					break;
				}
			}
		}
		while (taggedUsersList.size() > 5)
			taggedUsersList
					.remove(new Random().nextInt(taggedUsersList.size()));
		addTaggedUsersToPost(postId, taggedUsersList);
		addPostIdToUser(postId, taggedUsersList);
		return taggedUsersList;
	}

	public static List<Post> fetchUserTaggedPosts(String userId) {

		DBObject userObject = userCollection.findOne(new BasicDBObject(ID,
				userId));
		BasicDBList dbList = (BasicDBList) userObject.get("taggedPosts");
		return fetchPostLists(dbList);
	}

	public static List<Post> fetchUserModeratedPosts(String userId) {
		DBObject userObject = userCollection.findOne(new BasicDBObject(ID,
				userId));
		BasicDBList dbList = (BasicDBList) userObject.get("moderatedPosts");
		return fetchPostLists(dbList);
	}

	private static List<Post> fetchPostLists(BasicDBList dbList) {
		List<Post> postList = new ArrayList<Post>();
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.setPrettyPrinting();
		Gson gson = gsonBuilder.create();
		for (Object object : dbList) {
			DBObject postObject = postCollection.findOne(new BasicDBObject(ID,
					object));
			postList.add(gson
					.fromJson(convertObjToJson(postObject), Post.class));
		}
		Collections.sort(postList, new Comparator<Post>() {

			@Override
			public int compare(Post o1, Post o2) {
				return (o2.getDatePosted().compareTo(o1.getDatePosted()));
			}
		});
		return postList;
	}

	public static void deletePost(Post post) {
		DBObject postObject = postCollection.findOne(new BasicDBObject(ID, post
				.getPostId()));
		postCollection.remove(postObject);
	}

	private static String convertObjToJson(Object object) {

		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.setPrettyPrinting();
		Gson gson = gsonBuilder.create();
		return gson.toJson(object);
	}

	public static void addModeratorToPost(Post post, User moderator) {
		DBObject postObject = postCollection.findOne(new BasicDBObject(ID, post
				.getPostId()));
		BasicDBList moderatorList = (BasicDBList) postObject
				.get("moderatorList");
		moderatorList.add((BasicDBObject) JSON
				.parse(convertObjToJson(moderator)));
		postCollection.save(postObject);
	}

	public static void updateScore(User user, int count) {

		DBObject userObject = userCollection.findOne(new BasicDBObject(ID, user
				.getUserId()));
		Integer score = (Integer) userObject.get("score");
		userObject.put("score", (Integer) score + count);
		userCollection.save(userObject);
	}

	public static void addError(String moderatorId, String commentId,
			String errorType, String errorLink) {
		String[] commentTree = commentId.split("#");
		DBObject commentObject = postCollection.findOne(new BasicDBObject(ID,
				commentTree[0]));
		DBObject postObject = commentObject;
		BasicDBList commentsList = (BasicDBList) commentObject
				.get("commentsList");
		commentId = commentTree[0];

		for (int i = 1; i < commentTree.length; i++) {
			commentId += "#" + commentTree[i];
			for (Object comment : commentsList) {
				commentObject = (BasicDBObject) comment;
				if (commentObject.get(ID).equals(commentId))
					break;
			}
			commentsList = (BasicDBList) commentObject.get("commentsList");
		}
		commentObject.put("errorType", errorType);
		commentObject.put("errorLink", errorLink);
		postCollection.save(postObject);

		if (!moderatorId.equals("moderator")) {
			DBObject userObject = userCollection.findOne(new BasicDBObject(
					"userId", moderatorId));
			Integer moderatorScore = (Integer) userObject.get("moderatorScore");
			userObject.put("moderatorScore", moderatorScore + 5);
			userCollection.save(userObject);
		}
	}

	public static void incrementCommentScore(String commentId) {
		String[] commentTree = commentId.split("#");
		DBObject commentObject = postCollection.findOne(new BasicDBObject(ID,
				commentTree[0]));
		DBObject postObject = commentObject;
		BasicDBList commentsList = (BasicDBList) commentObject
				.get("commentsList");
		commentId = commentTree[0];

		for (int i = 1; i < commentTree.length; i++) {
			commentId += "#" + commentTree[i];
			for (Object comment : commentsList) {
				commentObject = (BasicDBObject) comment;
				if (commentObject.get(ID).equals(commentId))
					break;
			}
		}

		Integer upVotes = (Integer) commentObject.get("upVotes");
		Integer downVotes = (Integer) commentObject.get("downVotes");
		commentObject.put("upVotes", ++upVotes);

		DBObject commentOwner = (DBObject) commentObject.get("commentOwner");
		String userId = (String) commentOwner.get("userId");
		DBObject userObject = userCollection.findOne(new BasicDBObject(
				"userId", userId));

		Integer score = (Integer) userObject.get("score");
		score += 2;
		commentOwner.put("score", score);
		userObject.put("score", score);

		BasicDBList moderatorList = (BasicDBList) postObject
				.get("moderatorList");

		User user = getUser(userId);
		if (!user.getModeratedPosts().contains(commentTree[0])
				&& moderatorList.size() < 5 && upVotes - downVotes >= 5) {
			Integer moderatorScore = (Integer) commentOwner
					.get("moderatorScore");
			commentOwner.put("moderatorScore", ++moderatorScore);
			userObject.put("moderatorScore", moderatorScore);
			moderatorList.add((BasicDBObject) JSON
					.parse(convertObjToJson(commentOwner)));
			BasicDBList moderatedPost = (BasicDBList) userObject
					.get("moderatedPosts");
			moderatedPost.add(commentTree[0]);
		}
		postCollection.save(postObject);
		userCollection.save(userObject);

	}

	public static void decrementCommentScore(String commentId) {
		String[] commentTree = commentId.split("#");
		DBObject commentObject = postCollection.findOne(new BasicDBObject(ID,
				commentTree[0]));
		DBObject postObject = commentObject;
		BasicDBList commentsList = (BasicDBList) commentObject
				.get("commentsList");
		commentId = commentTree[0];

		for (int i = 1; i < commentTree.length; i++) {
			commentId += "#" + commentTree[i];
			for (Object comment : commentsList) {
				commentObject = (BasicDBObject) comment;
				if (commentObject.get(ID).equals(commentId))
					break;
			}
		}
		Integer downVotes = (Integer) commentObject.get("downVotes");
		commentObject.put("downVotes", ++downVotes);

		DBObject commentOwner = (DBObject) commentObject.get("commentOwner");
		String userId = (String) commentOwner.get("userId");
		DBObject userObject = userCollection.findOne(new BasicDBObject(
				"userId", userId));

		Integer score = (Integer) userObject.get("score");
		score -= 2;
		commentOwner.put("score", score);
		userObject.put("score", score);

		postCollection.save(postObject);
		userCollection.save(userObject);
	}

	private static void updateScore(String postId, int addScore) {
		DBObject dbObject = postCollection
				.findOne(new BasicDBObject(ID, postId));
		Integer upVotes = (Integer) dbObject.get("upVotes");
		dbObject.put("upVotes", ++upVotes);

		DBObject postOwner = (DBObject) dbObject.get("postOwner");
		String userId = (String) postOwner.get("userId");
		DBObject userObject = userCollection.findOne(new BasicDBObject(ID,
				userId));

		Integer score = (Integer) userObject.get("score");
		score += addScore;
		postOwner.put("score", score);
		postCollection.save(dbObject);

		userObject.put("score", score);
		userCollection.save(userObject);
	}

	public static void incrementPostScore(String postId) {
		updateScore(postId, 2);
	}

	public static void decrementPostScore(String postId) {
		updateScore(postId, -2);
	}

	public static List<Integer> getScoreList() {

		List<Integer> scoreList = new ArrayList<Integer>();
		DBCursor dbCursor = userCollection.find();
		for (DBObject dbObject : dbCursor) {
			scoreList.add((Integer) dbObject.get("score"));
		}
		return scoreList;
	}

	public static List<Integer> getModeratorScoreList() {
		List<Integer> moderatorScoreList = new ArrayList<Integer>();
		DBCursor dbCursor = userCollection.find();
		for (DBObject dbObject : dbCursor) {
			moderatorScoreList.add((Integer) dbObject.get("moderatorScore"));
		}
		return moderatorScoreList;
	}

	public static void closePost(String postId) {

		DBObject dbObject = postCollection
				.findOne(new BasicDBObject(ID, postId));
		dbObject.put("isOpen", false);
		postCollection.save(dbObject);

	}

	public static void timerScore(String userId) {
		DBObject dbObject = userCollection
				.findOne(new BasicDBObject(ID, userId));
		Integer score = (Integer) dbObject.get("score");
		dbObject.put("score", ++score);
		userCollection.save(dbObject);
	}

}
