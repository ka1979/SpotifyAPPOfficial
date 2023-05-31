var express = require('express');
var router = express.Router();
require('dotenv').config();
var querystring = require('querystring');
var request = require('request'); // "Request" library



var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var redirect_uri = 'http://localhost:3000/spotify/callback';
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
  var scope = 'user-read-private user-read-email user-top-read user-library-read';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

router.get('/callback', function(req, res) {

  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };
    
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        console.log("Access Token:", body.access_token);

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var meOptions = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        var likedSongsOptions = {
          url: 'https://api.spotify.com/v1/me/tracks?market=US&limit=50&offset=0',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        var topSongsLongTermOptions = {
          url: 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50&offset=0',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        var topSongsMediumTermOptions = {
          url: 'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50&offset=0',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        var topSongsShortTermOptions = {
          url: 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50&offset=0',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        var topArtistsLongTermOptions = {
          url: 'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=30&offset=0',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        var topArtistsMediumTermOptions = {
          url: 'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=20&offset=0',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        var topArtistsShortTermOptions = {
          url: 'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10&offset=0',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        // TODO: need to make this one run first
        request.get(meOptions, function(error, response, body) {
          console.log("ME:");
          //console.log(body);
          console.log("==========================================================")
          // check if user is in database
            // if no, create user
          // then, update fields
        });

        // get liked songs
        request.get(likedSongsOptions, function(error, response, body) {
          console.log("LIKED SONGS:");
          const items = body.items;
          let ret = [];
          items.forEach(item => {
            let artists = []
            item.track.artists.forEach(artist => artists.push(artist.name))
            ret.push({title: item.track.name, artists: artists, image: item.track.album.images[1].url})
          })
          console.log("Finished Array of Liked Songs:", ret);
          console.log("==========================================================")
        });

        // get top songs long term
        request.get(topSongsLongTermOptions, function(error, response, body) {
          console.log("TOP SONGS LONG TERM:");
          //console.log(body);
          console.log("==========================================================")
        });

        // get top songs medium term
        request.get(topSongsMediumTermOptions, function(error, response, body) {
          console.log("TOP SONGS MEDIUM TERM:");
          //console.log(body);
          console.log("==========================================================")
        });

        // get top songs short term
        request.get(topSongsShortTermOptions, function(error, response, body) {
          console.log("TOP SONGS SHORT TERM:");
          //console.log(body);
          console.log("==========================================================")
        });

        // get top artists long term
        request.get(topArtistsLongTermOptions, function(error, response, body) {
          console.log("TOP ARTISTS LONG TERM:");
          //console.log(body);
          console.log("==========================================================")
        });

        // get top artists medium term
        request.get(topArtistsMediumTermOptions, function(error, response, body) {
          console.log("TOP ARTISTS MEDIUM TERM:");
          //console.log(body);
          console.log("==========================================================")
        });

        // get top artists short term
        request.get(topArtistsShortTermOptions, function(error, response, body) {
          console.log("TOP ARTISTS SHORT TERM:");
          //console.log(body);
          console.log("==========================================================")
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});


module.exports = router;