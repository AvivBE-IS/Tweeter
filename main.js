import { Tweeter } from "./model.js";
import { Renderer } from "./render.js";

const tweeter = new Tweeter();
const renderer = new Renderer();

// Initial render
renderer.renderPosts(tweeter.getPosts());

// Create New Post
$("#twit-btn").on("click", function () {
  const text = $("#input").val().trim();
  if (text) {
    tweeter.addPost(text);
    $("#input").val("");
    renderer.renderPosts(tweeter.getPosts());
  }
});

//  Delete Post
$("#posts").on("click", ".delete", function () {
  const postID = $(this).closest(".post").data("id");
  tweeter.removePost(postID);
  renderer.renderPosts(tweeter.getPosts());
});

// Add Comment
$("#posts").on("click", ".comment-button", function () {
  const $post = $(this).closest(".post");
  const postID = $post.data("id");
  const commentText = $post.find(".comment-input").val().trim();

  if (commentText) {
    tweeter.addComment(postID, commentText);
    $post.find(".comment-input").val("");
    renderer.renderPosts(tweeter.getPosts());
  }
});

//  Remove Comment
$("#posts").on("click", ".delete-comment", function () {
  const $post = $(this).closest(".post");
  const postID = $post.data("id");
  const commentID = $(this).data("id");

  tweeter.removeComment(postID, commentID);
  renderer.renderPosts(tweeter.getPosts());
});
