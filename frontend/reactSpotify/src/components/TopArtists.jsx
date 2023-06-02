import React from "react";
import { user } from "./LandingPage";
import { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "./Navbar";
import { Button } from "@mui/material";
import "../topItems.css";
import { useContext } from "react";
import { AppStateContext } from "../AppState";
import { Helmet } from "react-helmet";
export default function TopTracks() {
  const { appState, setAppState } = useContext(AppStateContext);
  let email = appState.user;
  if (!appState.user) {
    email = localStorage.getItem("email");
  }
  const [topArtistsLong, setTopArtistsLong] = useState([]);
  const [topArtistsMedium, setTopArtistsMedium] = useState([]);
  const [topArtistsShort, setTopArtistsShort] = useState([]);

  const [showingTopArtistsLong, setShowingTopArtistsLong] = useState(true);
  const [showingTopArtistsMedium, setShowingTopArtistsMedium] = useState(false);
  const [showingTopArtistsShort, setShowingTopArtistsShort] = useState(false);

  const getLongTerm = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/database/top-artists-long`,
        { email: email }
      );
      setTopArtistsLong(response.data.result);
    } catch (error) {
      console.error(error); // Handle any errors that occur
    }
  };

  const getMediumTerm = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/database/top-artists-medium`,
        { email: email }
      );
      setTopArtistsMedium(response.data.result);
    } catch (error) {
      console.error(error); // Handle any errors that occur
    }
  };

  const getShortTerm = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/database/top-artists-short`,
        { email: email }
      );
      setTopArtistsShort(response.data.result);
    } catch (error) {
      console.error(error); // Handle any errors that occur
    }
  };

  useEffect(() => {
    getLongTerm();
    getMediumTerm();
    getShortTerm();
  }, []);

  return (
    <>
      <Helmet>
        <title>Top Artists</title>
      </Helmet>
      <div style={{ alignItems: "center" }}>
        <NavigationBar page="top-artists" />
        <div className="view-container">
          <h1 className="white-text">
            {showingTopArtistsLong
              ? "All Time Top Artists"
              : showingTopArtistsMedium
              ? "Last 6 Months' Top Artists"
              : "Last Month's Top Artists"}
          </h1>
          <div className="time-buttons">
            <Button
              style={
                showingTopArtistsLong
                  ? { margin: "10px", backgroundColor: "white", color: "black" }
                  : { margin: "10px" }
              }
              variant="contained"
              onClick={() => {
                setShowingTopArtistsLong(true);
                setShowingTopArtistsMedium(false);
                setShowingTopArtistsShort(false);
              }}
            >
              All-time
            </Button>
            <Button
              style={
                showingTopArtistsMedium
                  ? { margin: "10px", backgroundColor: "white", color: "black" }
                  : { margin: "10px" }
              }
              variant="contained"
              onClick={() => {
                setShowingTopArtistsLong(false);
                setShowingTopArtistsMedium(true);
                setShowingTopArtistsShort(false);
              }}
            >
              Last 6 Months
            </Button>
            <Button
              style={
                showingTopArtistsShort
                  ? { margin: "10px", backgroundColor: "white", color: "black" }
                  : { margin: "10px" }
              }
              variant="contained"
              onClick={() => {
                setShowingTopArtistsLong(false);
                setShowingTopArtistsMedium(false);
                setShowingTopArtistsShort(true);
              }}
            >
              Last Month
            </Button>
          </div>
          {showingTopArtistsLong && (
            <div className="cards-container">
              {topArtistsLong.map((artist, index) => (
                <div className="top-card">
                  <img src={artist.image}></img>
                  <div className="description">
                    <p className="top-title">{artist.name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {showingTopArtistsMedium && (
            <div className="cards-container">
              {topArtistsMedium.map((artist, index) => (
                <div className="top-card">
                  <img src={artist.image}></img>
                  <div className="description">
                    <p className="top-title">{artist.name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {showingTopArtistsShort && (
            <div className="cards-container">
              {topArtistsShort.map((artist, index) => (
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
      </div>
    </>
  );
}
