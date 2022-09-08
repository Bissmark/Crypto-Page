import React from "react";
import { Routes, Route } from "react-router-dom";
import '../App.css'
import Home from "./Home";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Reset from "./Authentication/Reset";
import Dashboard from "./Authentication/Dashboard";
import CoinPage from "./CoinPage";
import SearchAppBar from "./Authentication/Navbar";

const App = () => {
  return (
    <div>
      <SearchAppBar />
        <Routes>
          <Route path="/" element={ <Home /> } />
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