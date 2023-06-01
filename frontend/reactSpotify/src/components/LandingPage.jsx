import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppStateContext } from "../AppState";
import "../landing.css";

export let user = null;

export default function LandingPage() {
  const navigate = useNavigate();
  const { appState, setAppState } = useContext(AppStateContext);

  const hash = window.location.hash.substr(1);

  // Parse the hash string into an object
  const hashParams = {};
  hash.split("&").forEach(function (item) {
    const [key, value] = item.split("=");
    hashParams[key] = decodeURIComponent(value);
  });

  // Extract the access_token and refresh_token
  const accessToken = hashParams.access_token;
  const refreshToken = hashParams.refresh_token;

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (email) user = email;
    setAppState((prevState) => ({
      ...prevState,
      user:email,
    }));
    localStorage.setItem("email", email)
  }, [email]);
  console.log(appState.user)




  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `http://localhost:3000/spotify/user?access_token=${accessToken}`
      );
      console.log(response.data.email);
      setEmail(response.data.email);
    };
    fetchUser();
  }, []);

  const goHome = () => {
    navigate("../profile");
  };

  return email ? (
    <div className="blue-container">
      <h1 className="white-text">Welcome</h1>
      <div className="shadow-container">
        <p>
          We have successfully linked to your Spotify account with the following
          email:
        </p>
        <p className="email">{email}</p>
      </div>
      <Button
        style={{ margin: "20px", backgroundColor: "white", color: "black" }}
        variant="contained"
        onClick={() => goHome()}
      >
        Continue to App
      </Button>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

