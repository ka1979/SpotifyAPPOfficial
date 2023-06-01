// forum.js
var express = require('express');
var router = express.Router();
const db = require("../firebase");const { collection, addDoc, getDocs, getDoc, doc, updateDoc, where, query, serverTimestamp  } = require("firebase/firestore");


// Endpoint to create a new forum
router.post('/post', async (req, res) => {
  const { title, creator } = req.body;
  const newForum = {
    title,
    creator,
    createdAt: serverTimestamp(),
  };

  const forumRef = await addDoc(collection(db, 'forums'), newForum);
  res.json({ id: forumRef.id, ...newForum });
});

// Endpoint to get all forums
router.get('/get', async (req, res) => {
    const forumQuerySnapshot = await getDocs(collection(db, 'forums'));
    const forums = forumQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(forums);
  });
  
  // Endpoint to get a specific forum
  router.get('/forums/:id', async (req, res) => {
    const forumDoc = await getDoc(doc(db, 'forums', req.params.id));
    if (!forumDoc.exists()) {
      res.status(404).send("Forum not found");
      return;
    }
    res.json({ id: forumDoc.id, ...forumDoc.data() });
  });

  // Endpoint to get the name of current user
  router.post('/creator', async function (req, res, next) {
    const email = req.body.email;
    let ret;
    // console.log(req.query)  // shows the URL params (stuff after the ? in the URL)
    const q = query(collection(db, 'Users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      ret = doc.data()
    });
    console.log(ret);
    res.json({ result: ret.name });
  });
  

module.exports = router;
