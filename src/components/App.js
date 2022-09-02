import React from "react";
import { Router } from "express";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router history={ history }>
    <Routes>
        <Route exact path="/" element={ <Home /> } />
        <Route path="/coin" element={ <CoinSearch /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
    </Routes> 
  </Router>
  )
}

export default App;