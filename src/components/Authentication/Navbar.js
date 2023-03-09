import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TotalCoinInfo from '../TotalCoinInfo';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link as RouterLink } from "react-router-dom";
import { ThemeContext, themes } from '../../contexts/ThemeContext';
import { logout } from "../../firebase";
import GetUserName from "./GetUserName";
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchBar from '../SearchBar';

const SearchAppBar = ({ search, setSearch }) => {
    const [darkMode, setDarkMode] = useState(true);
    const [name, setName] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    //const [search, setSearch] = useState('');

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseLogOut = () => {
        logout();
        setAnchorEl(null);
    }

  return (
    <Box sx={{ flexGrow: 1, marginBottom: '7em' }}>
      <GetUserName {...{setName}} />
      <AppBar position="fixed">
        <Toolbar sx={{ backgroundColor: '#36393F', flexGrow: '1'}}>
          <TotalCoinInfo />
          <SearchBar search={search} setSearch={setSearch} />
          <Typography style={{ flex: 1 }}></Typography>
            <Button to="/" component={RouterLink}><HomeSharpIcon /></Button>
            <ThemeContext.Consumer>
            {({ changeTheme }) => (
            <Button
              onClick={() => {
                setDarkMode(!darkMode);
                changeTheme(darkMode ? themes.light : themes.dark);
              }}
            >
              { darkMode ? <DarkModeIcon /> : <LightModeIcon />}
            </Button>
            )}
            </ThemeContext.Consumer>
            { name && 
            <Button
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              {<AccountCircleIcon />}
            </Button>}
          <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem className='dropdown' to="/dashboard" component={RouterLink} onClick={handleClose}>{name}'s Portfolio</MenuItem>
              <MenuItem className='dropdown' to="/" component={RouterLink} onClick={handleCloseLogOut}>Logout</MenuItem>
            </Menu>
            { !name && <Button to="/login" component={RouterLink} onClick={handleClose}>Login</Button> }
            { !name && <Button to="/register" component={RouterLink} onClick={handleClose}>Signup</Button> }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default SearchAppBar;