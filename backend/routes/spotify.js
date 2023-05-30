var express = require('express');
var router = express.Router();
require('dotenv').config();
var querystring = require('querystring');


var client_id = process.env.CLIENT_ID;
var redirect_uri = 'http://localhost:5173';
const db = require("../firebase")


const {collection, getDocs} = require("firebase/firestore")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('spotify api');
});

router.get('/db', function(req, res, next) {
  getDocs(collection(db, "Users"))
  .then((allDocs) => {allDocs.forEach((doc) => console.log(doc.id))})

  res.send('respond with a resource');
});

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.get('/login', function(req, res) {

  var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});




module.exports = router;