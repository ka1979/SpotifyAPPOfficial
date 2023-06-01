import React from "react";
import NavigationBar from "./Navbar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useContext } from "react";

export default function UserPage() {
  const { email } = useParams();
  const [name, setName] = useState("");
  const [topSongs, setTopSongs] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);

  const [showingTopSongs, setShowingTopSongs] = useState(false);
  const [showingTopArtists, setShowingTopArtists] = useState(false);
  const [showingLikedSongs, setShowingLikedSongs] = useState(true);

  const getUserInfo = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/simon/user`, {
        email: email,
      });
      setName(response.data.result.name);
      setTopSongs(response.data.result.topSongsLong);
      setTopArtists(response.data.result.topArtistsLong);
      setLikedSongs(response.data.result.likedSongs);
    } catch (error) {
      console.error(error); // Handle any errors that occur
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="view-container">
        <h1 className="white-text">{name}</h1>
        <div className="time-buttons">
          <Button
            style={{ margin: "10px" }}
            variant="contained"
            onClick={() => {
              setShowingLikedSongs(true);
              setShowingTopArtists(false);
              setShowingTopSongs(false);
            }}
          >
            Liked Songs
          </Button>
          <Button
            style={{ margin: "10px" }}
            variant="contained"
            onClick={() => {
              setShowingLikedSongs(false);
              setShowingTopArtists(false);
              setShowingTopSongs(true);
            }}
          >
            Top Songs
          </Button>
          <Button
            style={{ margin: "10px" }}
            variant="contained"
            onClick={() => {
              setShowingLikedSongs(false);
              setShowingTopArtists(true);
              setShowingTopSongs(false);
            }}
          >
            Top Artists
          </Button>
        </div>
        {showingLikedSongs && (
          <div className="cards-container">
            {likedSongs.map((track, index) => (
              <div className="top-card">
                <img src={track.image}></img>
                <div className="description">
                  <p className="top-title">{track.title}</p>
                  {track.artists.map((artist, index) => (
                    <p>{artist}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {showingTopSongs && (
          <div className="cards-container">
            {topSongs.map((track, index) => (
              <div className="top-card">
                <img src={track.image}></img>
                <div className="description">
                  <p className="top-title">{track.title}</p>
                  {track.artists.map((artist, index) => (
                    <p>{artist}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {showingTopArtists && (
          <div className="cards-container">
            {topArtists.map((artist, index) => (
              <div className="top-card">
                <img src={artist.image}></img>
                <div className="description">
                  <p className="top-title">{artist.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
