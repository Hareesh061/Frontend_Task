import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './components/Login/login'
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from './components/Login/signup';
import Home from './components/homepage/home';
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="" element={<Login/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home"  element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App