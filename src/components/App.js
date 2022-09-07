import React, { useState  } from "react";
import { Routes, Route } from "react-router-dom";
import '../App.css'
import { Link } from "react-router-dom";
import { ThemeContext, themes } from "../contexts/ThemeContext";
import Dropdown from "react-bootstrap/Dropdown";

import Home from "./Home";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Reset from "./Authentication/Reset";
import Dashboard from "./Authentication/Dashboard";
import CoinPage from "./CoinPage";
import GetUserName from "./Authentication/GetUserName";
import Portfolio from "./Portfolio";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [name, setName] = useState("");

  return (
    <div>
      <GetUserName {...{setName}} />
        <nav>
            <Link to="/">Home</Link>
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
            <div style={{display: 'inline-block' }}>
              { name && <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                  {name}
                </Dropdown.Toggle>
              

                <Dropdown.Menu >
                  <Dropdown.Item href="/dashboard">Profile</Dropdown.Item>
                  <Dropdown.Item href="/portfolio">Portfolio</Dropdown.Item>
                  <Dropdown.Item href="/">Signout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> }
            </div>
            { !name && <Link to="/login" >Login |</Link> }
            { !name && <Link to="/register" >Signup |</Link> }
        </nav>
        
        <Routes>
          <Route exact path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/reset" element={ <Reset /> } />
          <Route path="/dashboard" element={ <Dashboard /> } />
          <Route path="/" element={ <Home /> } />
          <Route path="/:coinName" element={ <CoinPage /> } />
		  <Route path="/portfolio" element={ <Portfolio /> } />
        </Routes>
    </div>
  );
}

export default App;