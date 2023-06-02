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

router.post("/profile", async function (req, res, next) {
  const email = req.body.email;
  let ret;
  const q = query(collection(db, "Users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    ret = doc.data()
  });
  res.json({ result: ret });
});

router.post("/update_privacy", async function (req, res, next) {
  const email = req.body.email;
  const isPublic = req.body.isPublic;
  const userDoc = doc(db, "Users", email);
  await updateDoc(userDoc, {
    isPublic: !isPublic
  });
});

module.exports = router;
