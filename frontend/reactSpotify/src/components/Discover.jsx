import React from "react";
import NavigationBar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Discover() {
  const [publicUsers, setPublicUsers] = useState([]);
  const navigate = useNavigate();

  const getPublicUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/simon/public-users`
      );
      setPublicUsers(response.data.result);
    } catch (error) {
      console.error(error); // Handle any errors that occur
    }
  };

  useEffect(() => {
    getPublicUsers();
  }, []);

  const goToUserProfile = (email) => {
    console.log("going to profile: ", email);
    navigate(`/user/${email}`);
  };

  return (
    <>
      <NavigationBar />
      <div className="view-container">
        <h1 className="white-text">Discover</h1>
        <h2 className="white-text">
          View public users and the music they've been listening to
        </h2>
        <div className="cards-container">
          {publicUsers.map((user) => (
            <div
              style={{ cursor: "pointer" }}
              className="top-card"
              onClick={() => goToUserProfile(user.email)}
            >
              <img src={user.image}></img>
              <p className="top-title">{user.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
