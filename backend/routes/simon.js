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

router.get("/public-users", async function (req, res, next) {
  let ret = [];
  const q = query(collection(db, "Users"), where("isPublic", "==", true));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    ret.push(doc.data());
  });
  console.log(ret);
  res.json({ result: ret });
});

module.exports = router;