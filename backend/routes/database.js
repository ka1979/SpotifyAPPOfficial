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
}
router.get("/all-users", async function (req, res, next) {
  try {
    const responseData = await fetchData("Users");
    console.log(responseData);
    res.json(responseData)
  } catch (error) {
    console.error("Error fetching data:", error);
  }

});

module.exports = router;
