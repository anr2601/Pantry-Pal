import './App.css'
import Login from './Components/login';
import SignUp from './Components/signup';
import Home from './Components/home';
import Welcome from './Components/welcome'
import View from './Components/view'
import Scrape from './Components/scrape'
import {useState, useEffect} from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if JWT token exists in Chrome Storage
    chrome.storage.local.get(['token'], (result) => {
      if (result.token) {
        // Optionally, you can validate the token here
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  
  return (
    <>
      <div>
        
        <HashRouter>        
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/welcome" /> : <Home />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/welcome" element={<Welcome/>}/>
            <Route path="/view" element={<View/>}/>
            <Route path="/scrape" element={<Scrape/>}/>
          </Routes>
        </HashRouter>
        
      </div>

    </>
  )
}

export default App
