import React from "react";
import { Routes, Route } from "react-router-dom";
import '../App.css'

import Home from "./Home";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";

const App = () => {
  return (
    <Routes>
        <Route exact path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
    </Routes>
  );
}

export default App;