import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import '../App.css'
import Home from "./Home";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Reset from "./Authentication/Reset";
import Dashboard from "./Authentication/Dashboard";
import CoinPage from "./CoinPage";
import Navbar from "./Authentication/Navbar";
import NavbarMobile from "./Authentication/Navbar-mobile";
import MediaQuery from 'react-responsive';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      {/* Setting up routes for navigating around the website, and setting up Media Queries for mobile or desktop */}
      <MediaQuery maxWidth={500}>
        <NavbarMobile setSearchQuery={ setSearchQuery } />
      </MediaQuery>
      <MediaQuery minWidth={600}>
        <Navbar setSearchQuery={ setSearchQuery } />
      </MediaQuery>
        <Routes>
          <Route path="/" element={ <Home searchQuery={searchQuery} /> } />
          <Route exact path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/reset" element={ <Reset /> } />
          <Route path="/dashboard" element={ <Dashboard /> } />
          <Route path="/:coinName" element={ <CoinPage /> } />
        </Routes>
    </div>
  );
}

export default App;