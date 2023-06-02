var express = require("express");
var router = express.Router();
const db = require("../firebase");

const {
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  deleteDoc,
  addDoc,
  doc,
  setDoc,
} = require("firebase/firestore");

router.get("/", function (req, res, next) {
  res.send("database api");
});
const getUserConversations = async (userName, email) => {
  try {
    const q = query(
      collection(db, "Messages"),
      where("users", "array-contains", { email, userName })
    );
    const querySnapshot = await getDocs(q);
    const conversations = [];
    const DocIds = [];
    querySnapshot.forEach((doc) => {
      const conversation = doc.data();
      conversations.push(conversation);
      DocIds.push(doc.id);
    });

    return { conversations, DocIds };
  } catch (error) {
    console.log("Error getting user conversations:", error);
    return [];
  }
};
router.get("/getMessages", async function (req, res, next) {
  console.log(req.query.username);
  console.log(req.query.email);

  try {
    const responseData = await getUserConversations(
      req.query.username,
      req.query.email
    );
    console.log(responseData);
    res.json({ responseData });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

const addExistingMessage = async (req, res) => {
  const newItem = req.body.messageUpdated

  try {
    const MessageRef = doc(db, "Messages", req.body.id);
    await updateDoc(MessageRef, {...newItem});
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Failed to add item' });
  }
};
router.post("/addMessageExisting", addExistingMessage);
  
router.post("/top-tracks-long", async function (req, res, next) {
  const email = req.body.email;
  let ret;
  // console.log(req.query)  // shows the URL params (stuff after the ? in the URL)
  const q = query(collection(db, "Users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    ret = doc.data().topSongsLong;
  });
  console.log(ret);
  res.json({ result: ret });
});

router.post("/top-tracks-medium", async function (req, res, next) {
  const email = req.body.email;
  let ret;
  // console.log(req.query)  // shows the URL params (stuff after the ? in the URL)
  const q = query(collection(db, "Users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    ret = doc.data().topSongsMedium;
  });
  console.log(ret);
  res.json({ result: ret });
});

router.post("/top-tracks-short", async function (req, res, next) {
  const email = req.body.email;
  let ret;
  // console.log(req.query)  // shows the URL params (stuff after the ? in the URL)
  const q = query(collection(db, "Users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    ret = doc.data().topSongsShort;
  });
  console.log(ret);
  res.json({ result: ret });
});

router.post("/top-artists-long", async function (req, res, next) {
  const email = req.body.email;
  let ret;
  // console.log(req.query)  // shows the URL params (stuff after the ? in the URL)
  const q = query(collection(db, "Users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    ret = doc.data().topArtistsLong;
  });
  console.log(ret);
  res.json({ result: ret });
});

router.post("/top-artists-medium", async function (req, res, next) {
  const email = req.body.email;
  let ret;
  // console.log(req.query)  // shows the URL params (stuff after the ? in the URL)
  const q = query(collection(db, "Users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    ret = doc.data().topArtistsMedium;
  });
  console.log(ret);
  res.json({ result: ret });
});

router.post("/top-artists-short", async function (req, res, next) {
  const email = req.body.email;
  let ret;
  // console.log(req.query)  // shows the URL params (stuff after the ? in the URL)
  const q = query(collection(db, "Users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    ret = doc.data().topArtistsShort;
  });
  console.log(ret);
  res.json({ result: ret });
});

router.post("/liked-songs", async function (req, res, next) {
  const email = req.body.email;
  let ret;
  // console.log(req.query)  // shows the URL params (stuff after the ? in the URL)
  const q = query(collection(db, "Users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    ret = doc.data().likedSongs;
  });
  console.log(ret);
  res.json({ result: ret });
});

const fetchData = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const responseData = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
      };
    });
    return responseData;
  } catch (error) {
    console.log("test");
    console.error("Error fetching data:", error);
    return [];
  }
};
router.get("/all-users", async function (req, res, next) {
  try {
    const responseData = await fetchData("Users");
    console.log(responseData);
    res.json(responseData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

router.post("/new-chat", async function (req, res, next) {
  try {
    const object = req.body.newObject;
    setDoc(doc(db, "Messages", req.body.id), object);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

module.exports = router;
