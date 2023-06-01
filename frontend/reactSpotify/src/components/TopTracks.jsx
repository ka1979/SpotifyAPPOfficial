import React from "react";
import { user } from "./LandingPage";
import { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "./Navbar";
import { Button } from "@mui/material";
import "../topItems.css";
import { useContext } from "react";
import { AppStateContext } from "../AppState";

export default function TopTracks() {
  const { appState, setAppState } = useContext(AppStateContext);
  let email = appState.user;
  if (!appState.user) {
    email = localStorage.getItem("email");
  }

  const [topTracksLong, setTopTracksLong] = useState([]);
  const [topTracksMedium, setTopTracksMedium] = useState([]);
  const [topTracksShort, setTopTracksShort] = useState([]);

  const [showingTopTracksLong, setShowingTopTracksLong] = useState(true);
  const [showingTopTracksMedium, setShowingTopTracksMedium] = useState(false);
  const [showingTopTracksShort, setShowingTopTracksShort] = useState(false);

  const getLongTerm = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/database/top-tracks-long`,
        { email: email }
      );
      setTopTracksLong(response.data.result);
    } catch (error) {
      console.error(error); // Handle any errors that occur
    }
  };

  const getMediumTerm = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/database/top-tracks-medium`,
        { email: email }
      );
      setTopTracksMedium(response.data.result);
    } catch (error) {
      console.error(error); // Handle any errors that occur
    }
  };

  const getShortTerm = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/database/top-tracks-short`,
        { email: email }
      );
      setTopTracksShort(response.data.result);
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
      <NavigationBar page="top-tracks" />
      <div className="view-container">
        <h1 className="white-text">
          {showingTopTracksLong
            ? "All Time Top Tracks"
            : showingTopTracksMedium
            ? "Last 6 Months' Top Tracks"
            : "Last Month's Top Tracks"}
        </h1>
        <div className="time-buttons">
          <Button
            style={{ margin: "10px" }}
            variant="contained"
            onClick={() => {
              setShowingTopTracksLong(true);
              setShowingTopTracksMedium(false);
              setShowingTopTracksShort(false);
            }}
          >
            All-time
          </Button>
          <Button
            style={{ margin: "10px" }}
            variant="contained"
            onClick={() => {
              setShowingTopTracksLong(false);
              setShowingTopTracksMedium(true);
              setShowingTopTracksShort(false);
            }}
          >
            Last 6 Months
          </Button>
          <Button
            style={{ margin: "10px" }}
            variant="contained"
            onClick={() => {
              setShowingTopTracksLong(false);
              setShowingTopTracksMedium(false);
              setShowingTopTracksShort(true);
            }}
          >
            Last Month
          </Button>
        </div>
        {showingTopTracksLong && (
          <div className="cards-container">
            {topTracksLong.map((track, index) => (
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
        {showingTopTracksMedium && (
          <div className="cards-container">
            {topTracksMedium.map((track, index) => (
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
        {showingTopTracksShort && (
          <div className="cards-container">
            {topTracksShort.map((track, index) => (
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
      </div>
    </div>
    </>
  );
}
