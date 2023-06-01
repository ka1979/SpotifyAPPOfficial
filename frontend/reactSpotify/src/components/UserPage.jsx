import React from "react";
import NavigationBar from "./Navbar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UserPage() {
  let { email } = useParams();

  const [name, setName] = useState("");
  const [topSongs, setTopSongs] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);

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
        <h1>{name}</h1>
        <p>{email}</p>
        <p>{name}</p>
        {console.log(topSongs)}
      </div>
    </>
  );
}
