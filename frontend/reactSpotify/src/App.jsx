import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from './components/login';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Chat from './components/Chat/chat';



import HomeSY from "./components/HomeSY";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Discover from "./components/Discover";
import TopTracks from "./components/TopTracks";
import TopArtists from "./components/TopArtists";
import Forums from "./components/Forums";
import Profile from "./components/Profile";
import LikedSongs from "./components/LikedSongs";

import Posts from "./components/Posts";






import UserPage from "./components/UserPage";


function App() {
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
      <Route path="/posts/:id" element={<Posts />} />
    </Routes>
  );
}

export default App;
