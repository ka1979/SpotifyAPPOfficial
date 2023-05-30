var express = require('express');
var router = express.Router();

const db = require("../firebase")


const {collection, getDocs} = require("firebase/firestore")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/db', function(req, res, next) {
  getDocs(collection(db, "Users"))
  .then((allDocs) => {allDocs.forEach((doc) => console.log(doc.id))})

  res.send('respond with a resource');
});




module.exports = router;
