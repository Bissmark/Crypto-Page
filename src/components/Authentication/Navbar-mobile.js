import React, { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TotalCoinInfo from '../TotalCoinInfo';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { IconButton, useTheme } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import { ThemeContext, themes } from '../../contexts/ThemeContext';
import { logout } from "../../firebase";
import GetUserName from "./GetUserName";
import { LightMode } from '@mui/icons-material';

const NavbarMobile = () => {
  const theme = useTheme();
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
    <Box>
        <GetUserName {...{setName}} />
      <AppBar position="static" >
        <Toolbar sx={{ backgroundColor: '#36393F'}}>
          {/* <TotalCoinInfo /> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
          </Typography>
        <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
        >
          <Button
            variant='link'
            size='extra-large'
            onClick={handleClick}
            startIcon={<MenuIcon />}
          > 
          </Button>
          <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
            <MenuItem className="home-button" to="/" onClick={handleClose} component={RouterLink}>Home</MenuItem>
            { name &&   <MenuItem className='dropdown' to="/dashboard" component={RouterLink} onClick={handleClose}>{name}</MenuItem> }
            <ThemeContext.Consumer>
            {({ changeTheme }) => (
            <Button
              onClick={() => {
                setDarkMode(!darkMode);
                changeTheme(darkMode ? themes.light : themes.dark);
                // theme.palette.mode === 'dark' ? <DarkModeIcon /> : <LightMode />
              }}
            >
              {/* {theme.palette.mode} mode */}
              {theme.palette.mode === 'dark' ? <DarkModeIcon /> : <LightMode />}  
              
            </Button>
            )}
          </ThemeContext.Consumer>
            { name &&  <MenuItem className='dropdown' to="/" component={RouterLink} onClick={handleCloseLogOut}>Logout</MenuItem> }
            { !name && <MenuItem to="/login" component={RouterLink} onClick={handleClose}>Login</MenuItem> }
            { !name && <MenuItem to="/register" component={RouterLink} onClick={handleClose}>Signup</MenuItem> }
            </Menu>
        </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavbarMobile;