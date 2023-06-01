import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from './components/login';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Chat from './components/Chat/chat';



import PageNotFound from "./components/PageNotFound/PageNotFound";
import HomeSY from "./components/HomeSY";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Discover from "./components/Discover";
import TopTracks from "./components/TopTracks";
import TopArtists from "./components/TopArtists";
import Forums from "./components/Forums";
import Profile from "./components/Profile";
import LikedSongs from "./components/LikedSongs";
import UserPage from "./components/UserPage";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // this state should be managed with authentication state

  // [isLoggedIn, setIsLoggedIn] = useState(false); // this state should be managed with authentication state
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/liked" element={<LikedSongs />} />
      <Route path="/chat" element={<Chat />} />

      <Route path="/discover" element={<Discover />} />
      <Route path="/user/:email" element={<UserPage />} />
      <Route path="/top-tracks" element={<TopTracks />} />
      <Route path="/top-artists" element={<TopArtists />} />
      <Route path="/forums" element={<Forums />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/homeSY" element={<HomeSY />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
