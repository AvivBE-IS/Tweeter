// render.js

export class Renderer {
  renderPosts(posts) {
    const $postsContainer = $("#posts");
    $postsContainer.empty(); // Step 1: Empty the container

    for (const post of posts) {
      // Create post container
      const $postDiv = $("<div>").addClass("post").attr("data-id", post.id);

      // Post content
      const $postText = $("<div>").addClass("post-text").text(post.text);
      const $deletePost = $("<div>")
        .addClass("delete")
        .attr("data-id", post.id)
        .text("Delete Post");

      // Comments container
      const $commentsDiv = $("<div>").addClass("comments");

      for (const comment of post.comments) {
        const $commentDiv = $("<div>")
          .addClass("comment")
          .attr("data-id", comment.id)
          .text(comment.text);
        const $deleteComment = $("<div>")
          .addClass("delete-comment")
          .attr("data-id", comment.id)
          .text("X");

        $commentsDiv.append($commentDiv, $deleteComment);
      }

      // Input and button
      const $input = $("<input>")
        .addClass("comment-input")
        .attr("type", "text")
        .attr("placeholder", "Got something to say?");
      const $button = $("<button>").addClass("comment-button").text("Comment");

      // Append all to the post div
      $postDiv.append($postText, $deletePost, $commentsDiv, $input, $button);

      // Append post to the main container
      $postsContainer.append($postDiv);
    }
  }
}
