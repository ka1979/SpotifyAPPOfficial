import { React, useState, useEffect } from "react";
import NavigationBar from "./Navbar";
import { user } from "./LandingPage";
import axios from "axios";
import Switch from "react-switch";
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";
import { useContext } from "react";
import { AppStateContext } from "../AppState";
export default function Profile() {
  const { appState, setAppState } = useContext(AppStateContext);
  let email = appState.user;
  if (!appState.user) {
    email = localStorage.getItem("email");
  }
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState("false");
  const handleSwitch = async (e) => {
    setIsPublic(e);
    try {
      const response = await axios.post(
        `http://localhost:3000/yash/update_privacy`,
        {
          email: email,
          isPublic: isPublic,
        }
      );
      // setName(response.data.result.name);
      // setIsPublic(response.data.result.isPublic);
      console.log(response.data.result.name);
      console.log(response.data.result.isPublic);
    } catch (error) {
      console.error(error); // Handle any errors that occur
    }
  };
  const getProfile = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/yash/profile`, {
        email: email,
      });
      setName(response.data.result.name);
      setIsPublic(response.data.result.isPublic);
      setImage(response.data.result.image);
      console.log(response.data.result.name);
      console.log(response.data.result.isPublic);
    } catch (error) {
      console.error(error); // Handle any errors that occur
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div className="view-container">
      <NavigationBar page="profile" />
      <h1 className="white-text">My Profile</h1>
      <div className="top-card">
        <img src={image} style={{ marginBottom: "0px" }} />
      </div>

      <div className="cards-container">
        <div className="top-card">
          <h2>Display Name:</h2>
          <div
            className="shadow-container"
            style={{
              marginTop: "10px",
              padding: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h3>{name}</h3>
          </div>
        </div>

        <div className="top-card">
          <h2>Email:</h2>
          <div
            className="shadow-container"
            style={{
              marginTop: "10px",
              padding: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h3>{email}</h3>
          </div>
        </div>

        <div className="top-card">
          {isPublic ? (
            <h2>
              <BsFillUnlockFill /> Public Profile
            </h2>
          ) : (
            <h2>
              <BsFillLockFill /> Private Profile
            </h2>
          )}
          <Switch checked={isPublic} onChange={handleSwitch} />
          <div
            className="shadow-container"
            style={{ marginTop: "10px", padding: "5px" }}
          >
            <h7 className="white-text" style={{ marginTop: "10px" }}>
              When your profile is public, other users can see your name, top
              songs, top artists, and liked songs on the discover page
            </h7>
          </div>
        </div>
      </div>
    </div>
  );
}
