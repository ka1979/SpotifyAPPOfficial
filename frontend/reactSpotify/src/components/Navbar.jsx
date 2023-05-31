import { useState } from 'react';
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import { styled, ThemeProvider, useTheme } from "@mui/system";
import { theme } from '../theme.js';
import logo from '../assets/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';

const NavigationLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
  "&:hover": {
    color: theme.palette.secondary.main,
  },
  display: "block", // make sure each link takes the full width
  marginTop: theme.spacing(1), // add some top margin for spacing
}));

// use Stack component for vertical arrangement in the hamburger menu
const StyledStack = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main, // set background color
  width: 250,
  height: "100%",
  padding: theme.spacing(2),
  boxShadow: '0 0 10px #537FE7, 0 0 20px #537FE7, 0 0 30px #537FE7' // glow effect
}));

const NavigationButton = styled(Button)(({ theme }) => ({
 
  color: 'white', // theme color
  fontWeight: 'bold', // bold text
  "&:hover": {
    color: theme.palette.secondary.main,
    boxShadow: '0 0 10px #537FE7, 0 0 20px #537FE7, 0 0 30px #537FE7', // neon blue glow
  },
  "&:focus": {
    outline: "none",
  },
  height: "30px",
  margin: "0 10px",
}));

const NavigationBar = () => {
  const [open, setOpen] = useState(false);

  const themeUsed = useTheme();
  const isMobile = useMediaQuery(themeUsed.breakpoints.down('sm'));

  const toggleDrawer = (isOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(isOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" sx={{ backgroundColor: "theme.palette.primary.main" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "left" }}
          >
            <img
              src={logo}
              alt="Logo"
              height="80"
              style={{ margin: "10px", marginLeft: "40px" }}
            />
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <SwipeableDrawer
                anchor="right"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                PaperProps={{
                  sx: {
                    backgroundColor: 'black', // set background color to black
                    boxShadow: '0 0 10px #537FE7, 0 0 20px #537FE7, 0 0 30px #537FE7' // apply the glow effect
                  }
                }}
              >
                 <StyledStack
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <NavigationLink to="/discover-users">
                    <NavigationButton>Discover Users</NavigationButton>
                  </NavigationLink>
                  <NavigationLink to="/discover">
                    <NavigationButton>Discover</NavigationButton>
                  </NavigationLink>
                  <NavigationLink to="/top-tracks">
                    <NavigationButton>Top Tracks</NavigationButton>
                  </NavigationLink>
                  <NavigationLink to="/forums">
                    <NavigationButton>Forums</NavigationButton>
                  </NavigationLink>
                </StyledStack>
              </SwipeableDrawer>
            </>
          ) : (
            <>
              <NavigationLink to="/discover-users">
                <NavigationButton>Discover Users</NavigationButton>
              </NavigationLink>
              <NavigationLink to="/discover">
                <NavigationButton>Discover</NavigationButton>
              </NavigationLink>
              <NavigationLink to="/top-tracks">
                <NavigationButton>Top Tracks</NavigationButton>
              </NavigationLink>
              <NavigationLink to="/forums">
                <NavigationButton>Forums</NavigationButton>
              </NavigationLink>
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavigationBar;
