import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TotalCoinInfo from '../TotalCoinInfo';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import { ThemeContext, themes } from '../../contexts/ThemeContext';
import { logout } from "../../firebase";
import GetUserName from "./GetUserName";

const SearchAppBar = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [name, setName] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);

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
    <Box sx={{ flexGrow: 1 }}>
        <GetUserName {...{setName}} />
      <AppBar position="static">
        <Toolbar>
          <TotalCoinInfo />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
          </Typography>
          <div>
            <Button className="home-button" to="/" component={RouterLink}>Home</Button>
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
            </div>
          <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem className='dropdown' to="/dashboard" component={RouterLink} onClick={handleClose}>Profile</MenuItem>
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