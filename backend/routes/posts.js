// post.js
var express = require('express');
var router = express.Router();
const db = require("../firebase");
const { collection, addDoc, serverTimestamp } = require("firebase/firestore");

// Endpoint to create a new post
router.post('/', async (req, res) => {
  const { forumId, content, authorId } = req.body;
  const newPost = {
    forumId,
    content,
    authorId,
    createdAt: serverTimestamp(),
    likes: 0,
  };

  const postRef = await addDoc(collection(db, 'posts'), newPost);
  res.json({ id: postRef.id, ...newPost });
});

// Endpoint to get all posts for a specific forum
router.get('/forum/:forumId', async (req, res) => {
    const postQuery = query(collection(db, 'posts'), where('forumId', '==', req.params.forumId));
    const postQuerySnapshot = await getDocs(postQuery);
    const posts = postQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(posts);
  });
  
  // Endpoint to update a post's likes
  router.put('/:id/like', async (req, res) => {
    const postRef = doc(db, 'posts', req.params.id);
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) {
      res.status(404).send("Post not found");
      return;
    }
    const newLikes = postSnap.data().likes + 1;
    await updateDoc(postRef, { likes: newLikes });
    res.json({ id: postRef.id, likes: newLikes });
  });
  
  module.exports = router;
