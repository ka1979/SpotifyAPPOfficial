var express = require("express");
var router = express.Router();
const db = require("../firebase");

const {
  getDocs,
  collection,
  query,
  where,
} = require("firebase/firestore");

router.get("/", function (req, res, next) {
  res.send("database api");
});

router.post("/top-tracks-long", async function (req, res, next) {
  const email = req.body.email;
  let ret;
  const q = query(collection(db, "Users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    ret = doc.data().topSongsLong;
  });
  res.json({ result: ret });
});

router.post("/top-tracks-medium", async function (req, res, next) {
  const email = req.body.email;
  let ret;
  const q = query(collection(db, "Users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    ret = doc.data().topSongsMedium;
  });
  res.json({ result: ret });
});

router.post("/top-tracks-short", async function (req, res, next) {
  const email = req.body.email;
  let ret;
  const q = query(collection(db, "Users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    ret = doc.data().topSongsShort;
  });
  res.json({ result: ret });
});

router.post("/top-artists-long", async function (req, res, next) {
  const email = req.body.email;
  let ret;
  const q = query(collection(db, "Users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    ret = doc.data().topArtistsLong;
  });
  res.json({ result: ret });
});

router.post("/top-artists-medium", async function (req, res, next) {
  const email = req.body.email;
  let ret;
  const q = query(collection(db, "Users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    ret = doc.data().topArtistsMedium;
  });
  res.json({ result: ret });
});

router.post("/top-artists-short", async function (req, res, next) {
  const email = req.body.email;
  let ret;
  const q = query(collection(db, "Users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    ret = doc.data().topArtistsShort;
  });
  res.json({ result: ret });
});

router.post("/liked-songs", async function (req, res, next) {
  const email = req.body.email;
  let ret;
  const q = query(collection(db, "Users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    ret = doc.data().likedSongs;
  });
  res.json({ result: ret });
});

module.exports = router;
