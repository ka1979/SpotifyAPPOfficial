import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function HomeSY() {
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

  // if not access and not refresh => route to normal home page

  const [email, setEmail] = useState("");

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

  return (
    <div>
      <h1>Home</h1>
      <p>Email: {email}</p>
    </div>
  );
}
