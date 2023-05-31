import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from './components/login';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Chat from './components/Chat/chat';
function App() {
  const [count, setCount] = useState(0)
  const [loggedIn, setLoggedIN]=useState(false)
  return (
    <>
     <Routes>
     <Route path="/" element={<Login />} />
     <Route path="/chat" element={<Chat />} />

     <Route path="*" element={<PageNotFound />} />
     </Routes>
    </>
  )
}

export default App
