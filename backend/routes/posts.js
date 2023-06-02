var express = require("express");
var router = express.Router();
const db = require("../firebase");
const {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  runTransaction,
} = require("firebase/firestore");

//endpoint to create new post
router.post("/", async (req, res) => {
  const { forumId, title, creator } = req.body;
  const newPost = {
    id: Math.random().toString(36).substring(7),
    title,
    creator,
    createdAt: Date.now(),
    likes: 0,
  };

  await updateDoc(doc(db, "forums", forumId), {
    posts: arrayUnion(newPost),
  });

  res.json(newPost);
});

// Endpoint to get all posts for a specific forum
router.get("/:id", async (req, res) => {
  const forumDoc = await getDoc(doc(db, "forums", req.params.id));
  const posts = forumDoc.data().posts || [];
  res.json(posts);
});

router.get("/title/:id", async (req, res) => {
  const forumDoc = await getDoc(doc(db, "forums", req.params.id));
  const title = forumDoc.data().title || [];
  res.json(title);
});

// Endpoint to update a post's likes
router.post("/:id/like", async (req, res) => {
  const { forumId, postId } = req.body;
  const forumRef = doc(db, "forums", forumId);

  await runTransaction(db, async (transaction) => {
    const forumDoc = await transaction.get(forumRef);
    const posts = forumDoc.data().posts;
    const post = posts.find((post) => post.id === postId);
    if (!post) {
      throw "Post not found";
    }
    post.likes++;
    transaction.update(forumRef, { posts });
    res.json({ postId, likes: post.likes });
  });
});
module.exports = router;
