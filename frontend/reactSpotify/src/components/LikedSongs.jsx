import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "./Navbar";
import { Button } from "@mui/material";
import "../topItems.css";
import { useContext } from "react";
import { AppStateContext } from "../AppState";

export default function LikedSongs() {
  const  { appState, setAppState }=useContext(AppStateContext)
  const [likedSongs, setLikedSongs] = useState([]);
  const email = localStorage.getItem("email") || appState.user;
  useEffect(() => {
    // Store the email in localStorage whenever it changes
    localStorage.setItem("email", email);
  }, [email]);
  const getLikedSongs = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/database/liked-songs`,
        { email: email }
      );

      console.log(response.data.result)
      setLikedSongs(response.data.result);
    } catch (error) {
      console.error(error); // Handle any errors that occur
    }
  };

  useEffect(() => {

  
    
      getLikedSongs();
  
   
  }, []);

  return (
    <div style={{ alignItems: "center" }}>
      <NavigationBar />
      <div className="view-container">
        <h1 className="white-text">Recently Liked Songs</h1>
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
      </div>
    </div>
  );
}
