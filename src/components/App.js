import React, { useState  } from "react";
import { Routes, Route } from "react-router-dom";
import '../App.css'
import { Link as RouterLink } from "react-router-dom";
import { Link } from '@mui/material';
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
import TotalCoinInfo from "./TotalCoinInfo";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [name, setName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedList, setSelectedList] = useState([]);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const _handleClick = (index) => {
    if (selectedList.includes(index)) {
      setSelectedList(
        selectedList.filter(function (value) {
          return value !== index;
        }
        )
      );
    } else {
      setSelectedList([...selectedList, index]);
    }
  }

  return (
    <div>
      <GetUserName {...{setName}} />
        <nav>
          <ul className="left-area">
            <TotalCoinInfo />
          </ul>
          <ul className="right-area">
            <Button to="/" component={RouterLink}>Home</Button>
            <ThemeContext.Consumer>
            {({ changeTheme }) => (
            <Button
              onClick={() => {
                setDarkMode(!darkMode);
                changeTheme(darkMode ? themes.light : themes.dark);
              }}
            >
              Dark/Light
            </Button>
            )}
            </ThemeContext.Consumer>
            { name && 
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              {name}
            </Button>}
             
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem to="/dashboard" component={RouterLink} onClick={handleClose}>Profile</MenuItem>
              <MenuItem to="/portfolio" component={RouterLink} onClick={handleClose}>Portfolio</MenuItem>
              <MenuItem to="/" component={RouterLink} onClick={handleClose}>Logout</MenuItem>
            { !name && <MenuItem to="/login" component={RouterLink} onClick={handleClose}>Login</MenuItem> }
            { !name && <MenuItem to="/register" component={RouterLink} onClick={handleClose}>Signup</MenuItem> }
            </Menu> 
            
          </ul>
            
            
            {/* <div>
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
            </div> */}
        </nav>
        
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route exact path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/reset" element={ <Reset /> } />
          <Route path="/dashboard" element={ <Dashboard /> } />
		      <Route path="/portfolio" element={ <Portfolio /> } />
          <Route path="/:coinName" element={ <CoinPage /> } />
        </Routes>
    </div>
  );
}

export default App;