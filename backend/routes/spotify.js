var express = require("express");
var router = express.Router();
require("dotenv").config();
var querystring = require("querystring");
// var request = require('request'); // "Request" library
const request = require("request-promise-native"); // "request-promise-native" library

var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var redirect_uri = "http://localhost:3000/spotify/callback";
const db = require("../firebase");

const {
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} = require("firebase/firestore");

let userObject = {};

const populateDatabase = async (user) => {
  const docRef = doc(db, "Users", user.email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("user exists");
    await updateDoc(doc(db, "Users", user.email), {
      name: user.name,
      email: user.email,
      likedSongs: user.likedSongs,
      topArtistsLong: user.topArtistsLong,
      topArtistsMedium: user.topArtistsMedium,
      topArtistsShort: user.topArtistsShort,
      topSongsLong: user.topSongsLong,
      topSongsMedium: user.topSongsMedium,
      topSongsShort: user.topSongsShort,
    });
  } else {
    console.log("user does not exist");
    await setDoc(doc(db, "Users", user.email), user);
  }
};

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("spotify api");
});

router.get("/db", function (req, res, next) {
  getDocs(collection(db, "Users")).then((allDocs) => {
    allDocs.forEach((doc) => console.log(doc.id));
  });

  res.send("respond with a resource");
});

var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.get("/login", function (req, res) {
  var state = generateRandomString(16);
  var scope =
    "user-read-private user-read-email user-top-read user-library-read";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

router.get("/callback", function (req, res) {
  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log("Access Token:", body.access_token);

        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var meOptions = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        var likedSongsOptions = {
          url: "https://api.spotify.com/v1/me/tracks?market=US&limit=50&offset=0",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        var topSongsLongTermOptions = {
          url: "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50&offset=0",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        var topSongsMediumTermOptions = {
          url: "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50&offset=0",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        var topSongsShortTermOptions = {
          url: "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50&offset=0",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        var topArtistsLongTermOptions = {
          url: "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=30&offset=0",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        var topArtistsMediumTermOptions = {
          url: "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=20&offset=0",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        var topArtistsShortTermOptions = {
          url: "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10&offset=0",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        // TODO: need to make this one run first
        request.get(meOptions, function (error, response, body) {
          console.log("ME 1:");
          userObject.name = body.display_name;
          userObject.email = body.email;
          userObject.isPublic = true;
          userObject.displayingSongsAndArtists = true;
          console.log(
            "=========================================================="
          );
          // check if user is in database
          // if no, create user
          // then, update fields
          return request.get(likedSongsOptions).then(function (response) {
            console.log("LIKED SONGS 2:");
            //console.log(response)
            const items = response.items;
            let ret = [];
            items.forEach((item) => {
              let artists = [];
              item.track.artists.forEach((artist) => artists.push(artist.name));
              ret.push({
                title: item.track.name,
                artists: artists,
                image: item.track.album.images[1].url,
              });
            });
            userObject.likedSongs = ret;
            // console.log("Finished Array of Liked Songs:", ret);
            console.log(
              "=========================================================="
            );

            // get top songs long term
            return request
              .get(topSongsLongTermOptions)
              .then(function (response) {
                console.log("TOP SONGS LONG TERM 3:");
                const items = response.items;
                let ret = [];
                items.forEach((item) => {
                  let artists = [];
                  item.artists.forEach((artist) => artists.push(artist.name));
                  ret.push({
                    title: item.name,
                    artists: artists,
                    image: item.album.images[1].url,
                  });
                  // console.log(item);
                });
                //console.log("ret", ret);
                //console.log(response);
                userObject.topSongsLong = ret;
                console.log(
                  "=========================================================="
                );

                // get top songs medium term
                return request
                  .get(topSongsMediumTermOptions)
                  .then(function (response) {
                    console.log("TOP SONGS MEDIUM TERM 4:");
                    const items = response.items;
                    let ret = [];
                    items.forEach((item) => {
                      let artists = [];
                      item.artists.forEach((artist) =>
                        artists.push(artist.name)
                      );
                      ret.push({
                        title: item.name,
                        artists: artists,
                        image: item.album.images[1].url,
                      });
                      // console.log(item);
                    });
                    //console.log("ret", ret);
                    //console.log(response);
                    userObject.topSongsMedium = ret;
                    console.log(
                      "=========================================================="
                    );

                    // get top songs short term
                    return request
                      .get(topSongsShortTermOptions)
                      .then(function (response) {
                        console.log("TOP SONGS SHORT TERM 5:");
                        const items = response.items;
                        let ret = [];
                        items.forEach((item) => {
                          let artists = [];
                          item.artists.forEach((artist) =>
                            artists.push(artist.name)
                          );
                          ret.push({
                            title: item.name,
                            artists: artists,
                            image: item.album.images[1].url,
                          });
                          // console.log(item);
                        });
                        //console.log("ret", ret);
                        //console.log(response);
                        userObject.topSongsShort = ret;
                        console.log(
                          "=========================================================="
                        );

                        // get top artists long term
                        return request
                          .get(topArtistsLongTermOptions) // STOPPED HERE
                          .then(function (response) {
                            console.log("TOP ARTISTS LONG TERM 6:");
                            let ret = [];
                            response.items.forEach((item) =>
                              ret.push({
                                name: item.name,
                                image: item.images[1].url,
                              })
                            );
                            // console.log(body);
                            // console.log("finished artists: ", ret)
                            userObject.topArtistsLong = ret;
                            console.log(
                              "=========================================================="
                            );

                            // get top artists medium term
                            return request
                              .get(topArtistsMediumTermOptions)
                              .then(function (response) {
                                console.log("TOP ARTISTS MEDIUM TERM 7:");
                                let ret = [];
                                response.items.forEach((item) =>
                                  ret.push({
                                    name: item.name,
                                    image: item.images[1].url,
                                  })
                                );
                                // console.log(body);
                                // console.log("finished artists: ", ret)
                                userObject.topArtistsMedium = ret;
                                console.log(
                                  "=========================================================="
                                );

                                // get top artists short term
                                return request
                                  .get(topArtistsShortTermOptions)
                                  .then(function (response) {
                                    console.log("TOP ARTISTS SHORT TERM 8:");
                                    let ret = [];
                                    response.items.forEach((item) =>
                                      ret.push({
                                        name: item.name,
                                        image: item.images[1].url,
                                      })
                                    );
                                    // console.log(body);
                                    // console.log("finished artists: ", ret)
                                    userObject.topArtistsShort = ret;
                                    console.log(
                                      "=========================================================="
                                    );
                                    //console.log("UserObject:", userObject);
                                    // get top artists long term
                                    return request
                                      .get(topArtistsLongTermOptions)
                                      .then(populateDatabase(userObject));
                                  });
                              });
                          });
                      });
                  });
              });
          });
        });

        // // get liked songs
        // request.get(likedSongsOptions, function(error, response, body) {
        //   console.log("LIKED SONGS:");
        //   const items = body.items;
        //   let ret = [];
        //   items.forEach(item => {
        //     let artists = []
        //     item.track.artists.forEach(artist => artists.push(artist.name))
        //     ret.push({title: item.track.name, artists: artists, image: item.track.album.images[1].url})
        //   })
        //   // console.log("Finished Array of Liked Songs:", ret);
        //   console.log("==========================================================")
        // });

        // // get top songs long term
        // request.get(topSongsLongTermOptions, function(error, response, body) {
        //   console.log("TOP SONGS LONG TERM:");
        //   const items = body.items;
        //   let ret = [];
        //   items.forEach(item => {
        //     let artists = []
        //     item.artists.forEach(artist => artists.push(artist.name))
        //     ret.push({title: item.name, artists: artists, image: item.album.images[1].url})
        //     // console.log(item);
        //   })
        //   console.log("ret", ret);
        //   //console.log(body);
        //   console.log("==========================================================")
        // });

        // // get top songs medium term
        // request.get(topSongsMediumTermOptions, function(error, response, body) {
        //   console.log("TOP SONGS MEDIUM TERM:");
        //   const items = body.items;
        //   let ret = [];
        //   items.forEach(item => {
        //     let artists = []
        //     item.artists.forEach(artist => artists.push(artist.name))
        //     ret.push({title: item.name, artists: artists, image: item.album.images[1].url})
        //     // console.log(item);
        //   })
        //   console.log("ret", ret);
        //   //console.log(body);
        //   console.log("==========================================================")
        // });

        // // get top songs short term
        // request.get(topSongsShortTermOptions, function(error, response, body) {
        //   console.log("TOP SONGS SHORT TERM:");
        //   const items = body.items;
        //   let ret = [];
        //   items.forEach(item => {
        //     let artists = []
        //     item.artists.forEach(artist => artists.push(artist.name))
        //     ret.push({title: item.name, artists: artists, image: item.album.images[1].url})
        //     // console.log(item);
        //   })
        //   console.log("ret", ret);
        //   //console.log(body);
        //   console.log("==========================================================")
        // });

        // // get top artists long term
        // request.get(topArtistsLongTermOptions, function(error, response, body) {
        //   console.log("TOP ARTISTS LONG TERM:");
        //   let ret = [];
        //   body.items.forEach(item => ret.push({name: item.name, image: item.images[1].url}));
        //   // console.log(body);
        //   // console.log("finished artists: ", ret)
        //   console.log("==========================================================")
        // });

        // // get top artists medium term
        // request.get(topArtistsMediumTermOptions, function(error, response, body) {
        //   console.log("TOP ARTISTS MEDIUM TERM:");
        //   let ret = [];
        //   body.items.forEach(item => ret.push({name: item.name, image: item.images[1].url}));
        //   // console.log(body);
        //   // console.log("finished artists: ", ret)
        //   console.log("==========================================================")
        // });

        // // get top artists short term
        // request.get(topArtistsShortTermOptions, function(error, response, body) {
        //   console.log("TOP ARTISTS SHORT TERM:");
        //   let ret = [];
        //   body.items.forEach(item => ret.push({name: item.name, image: item.images[1].url}));
        //   // console.log(body);
        //   // console.log("finished artists: ", ret)
        //   console.log("==========================================================")
        // });

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          "http://localhost:5173/landing/#" +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      } else {
        res.redirect(
          "http://localhost:5173/#" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
});

// /spotify/refresh_token
router.get("/refresh_token", function (req, res) {
  var refresh_token = req.body.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});

router.get("/user", function (req, res) {
  const access_token = req.query.access_token;
  // console.log(req.query);
  // console.log(access_token);
  const meOptions = {
    url: "https://api.spotify.com/v1/me",
    headers: { Authorization: "Bearer " + access_token },
    json: true,
  };
  request.get(meOptions, function (error, response, body) {
    const email = body.email;
    res.send({ email });
  });
});

module.exports = router;
