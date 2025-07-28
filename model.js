export class Tweeter {
  #posts = [];
  #postIdCounter = 0;
  #commentIdCounter = 0;

  getPosts() {
    let str = "";
    if (this.#posts.length === 0) {
      console.log("There are no posts.");
      return false;
    }
    for (let post of this.#posts)
      str += `text: "${post.text}", id: ${post.id}, comments: ${post.comments}`;
    return str;
  }
  addPost(text) {
    this.#postIdCounter++;
    const newPost = new Post(text, this.#postIdCounter);
    this.#posts.push(newPost);
    console.log(newPost);
  }
  removePost(postID) {
    const removedPost = this.#posts.find((post) => post.id === postID);
    if (!removedPost) {
      console.log(`Post with ID ${postID} not found.`);
      return;
    }

    this.#posts = this.#posts.filter((post) => post.id !== postID);
    this.#postIdCounter--;
    console.log(removedPost);
  }
  addComment(PostID, text) {
    const post = this.#findPost(PostID);
    if (!post) {
      console.log(`Post with ID ${PostID} not found.`);
      return;
    }
    this.#commentIdCounter++;
    const comment = new Comment(this.#commentIdCounter, text);
    post.comments.push(comment);
    console.log(`The comment ${comment} has been added`);
  }
  removeComment(PostID, commentId) {
    const post = this.#findPost(PostID);
    if (!post) {
      console.log(`Post with ID ${PostID} not found.`);
      return;
    }

    const commentToRemove = post.comments.find((c) => c.id === commentId);
    if (!commentToRemove) {
      console.log(`Comment with ID ${commentId} not found in post ${PostID}.`);
      return;
    }

    post.comments = post.comments.filter((c) => c.id !== commentId);
    this.#commentIdCounter--;
    console.log(`Removed comment ID=${commentId} from post ${PostID}`);
  }

  #findPost(PostID) {
    return this.#posts.find((p) => p.id === PostID) || null;
  }
}

class Post {
  comments = [];

  constructor(text, id) {
    this.text = text;
    this.id = `p${id}`;
  }
}
class Comment {
  static numOfComments = 0;

  constructor(id, text) {
    this.id = `c${id}`;
    this.text = text;
  }
}

//DUMMY DATA
dummyData = [
  {
    text: "First post!",
    id: "p1",
    comments: [
      { id: "c1", text: "First comment on first post!" },
      { id: "c2", text: "Second comment on first post!!" },
      { id: "c3", text: "Third comment on first post!!!" },
    ],
  },
  {
    text: "Aw man, I wanted to be first",
    id: "p2",
    comments: [
      { id: "c4", text: "Don't worry second poster, you'll be first one day." },
      { id: "c5", text: "Yeah, believe in yourself!" },
      { id: "c6", text: "Haha second place what a joke." },
    ],
  },
];

const tweeter = new Tweeter();
// 2. Add posts and comments
for (const postData of dummyData) {
  tweeter.addPost(postData.text); // This will assign correct post ID

  // Get the last post that was added (for its ID)
  const addedPost = tweeter.getPosts().at(-1);
  const postID = addedPost.id;

  // 3. Add comments to this post
  for (const comment of postData.comments) {
    tweeter.addComment(postID, comment.text);
  }
}
// Test adding a post
// tweeter.addPost("This is my own post!");
// console.log(tweeter.getPosts());
// // Should add: {text: "This is my own post!", id: "p3", comments: []}

// // Test removing a post
// tweeter.removePost("p1");
// console.log(tweeter.getPosts());
// // Should only have two posts left

// Test adding comments
//tweeter.addComment("p3", "Damn straight it is!");
tweeter.addComment("p2", "Second the best!");
console.log(tweeter.getPosts());

// Test removing comments
tweeter.removeComment("p2", "c6");
console.log(tweeter.getPosts());
