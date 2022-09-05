import React, { useState } from "react";
import { Routes, Route, } from "react-router-dom";
import '../App.css'
import { Link } from "react-router-dom";
import { ThemeContext, themes } from "../contexts/ThemeContext";

import Home from "./Home";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import CoinPage from "./CoinPage";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div>
      <nav>
          <p>Logo | 
              <ThemeContext.Consumer>
              {({ changeTheme }) => (
              <button
                  onClick={() => {
                  setDarkMode(!darkMode);
                  changeTheme(darkMode ? themes.light : themes.dark);
                  }}
              >
                  <span>Night/Day</span>
              </button>
              )}  
              </ThemeContext.Consumer> 
              | <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link> </p>
      </nav>  
      <Routes>
          <Route exact path="/" element={ <Home /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/signup" element={ <Signup /> } />
          <Route path="/:coinName" element={ <CoinPage /> } />
      </Routes>
    </div>
  );
}

export default App;