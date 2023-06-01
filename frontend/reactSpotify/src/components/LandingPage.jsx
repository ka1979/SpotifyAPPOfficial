import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export let user = null;

export default function LandingPage() {
  const navigate = useNavigate();

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
  }, [email]);

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
    navigate("../homeSY");
  };

  return (
    <div>
      <h1>Welcome</h1>
      <p>
        We have successfully linked to your spotify account with email {email}.
      </p>
      <Button onClick={() => goHome()}>Continue to App</Button>
    </div>
  );
}
