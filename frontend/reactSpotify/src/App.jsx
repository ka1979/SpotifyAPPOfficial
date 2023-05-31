
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import HomeSY from "./components/HomeSY";
import Navbar from './components/Navbar';
import Login from './components/login.jsx';


function App() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false); // this state should be managed with authentication state

// [isLoggedIn, setIsLoggedIn] = useState(false); // this state should be managed with authentication state
  return (
    <>
      <Navbar /> {/* Add Navbar here */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homeSY" element={<HomeSY />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
