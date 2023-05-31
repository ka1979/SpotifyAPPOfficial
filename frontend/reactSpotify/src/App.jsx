<<<<<<< HEAD
import { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './components/login.jsx';
import './App.css';
// import DiscoverUsers from './pages/DiscoverUsers';
// import Discover from './pages/Discover';
// import TopTracks from './pages/TopTracks';
// import Forums from './pages/Forums';

// const ProtectedRoute = ({ element, isAuthenticated, ...props }) => (
//   <Route {...props} element={isAuthenticated ? element : <Navigate to="/login" />} />
// );

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // this state should be managed with authentication state

// [isLoggedIn, setIsLoggedIn] = useState(false); // this state should be managed with authentication state
  
    return (
      <>
       <Navbar /> {/* Add Navbar here */}
       <Routes>
         <Route path="/login" element={<Login />} />
         {/* <ProtectedRoute isAuthenticated={isLoggedIn} path="/discover-users" element={<DiscoverUsers />} />
         <ProtectedRoute isAuthenticated={isLoggedIn} path="/discover" element={<Discover />} />
         <ProtectedRoute isAuthenticated={isLoggedIn} path="/top-tracks" element={<TopTracks />} />
         <ProtectedRoute isAuthenticated={isLoggedIn} path="/forums" element={<Forums />} /> */}
       </Routes>
      </>
    )
  }
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from './components/login';
import PageNotFound from './components/PageNotFound/PageNotFound';
function App() {


  const [loggedIn, setLoggedIN]=useState(false)
  return (
    <>
     <Routes>
     <Route path="/" element={<Login />} />
  

     <Route path="*" element={<PageNotFound />} />
     </Routes>

    </>
  )
}
>>>>>>> ef67a54974cdf3f90c5ecc1595c67a63b1f9e030

export default App;
  
