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
import TotalCoinInfo from "./TotalCoinInfo";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [name, setName] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
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
            <TotalCoinInfo />
            <Button>Home</Button>
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
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              {name}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem
              onClick={() => _handleClick(0)}
              selected={selectedList.includes(0)}
              component={Link}
              href="https://en.wikipedia.org/wiki/History_of_the_electric_vehicle"
              target="_blank"

            ></MenuItem>
              <MenuItem containerElement={<Link to="/dashboard" />} onClick={handleClose}> <Link to="/dashboard"></Link>Profile</MenuItem>
              <MenuItem onClick={handleClose}> <Link to="/portfolio"></Link>Portfolio</MenuItem>
              <MenuItem onClick={handleClose}><Link to="/"></Link>Logout</MenuItem>
            </Menu>
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