import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { styled, ThemeProvider, useTheme } from "@mui/system";
import { theme } from "../theme.js";
import logo from "../assets/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
// import Box from '@mui/material/Box';
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import Person2Icon from "@mui/icons-material/Person2";

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
  backgroundColor: "#242424", // set background color
  width: 190,
  height: "100%",
  padding: theme.spacing(2),
  boxShadow: "0 0 10px #537FE7, 0 0 10px #537FE7, 0 0 10px #537FE7", // glow effect
}));

const NavigationButton = styled(Button)(({ theme }) => ({
  color: "white", // theme color
  fontWeight: "bold", // bold text
  border: "1px solid transparent",
  "&:hover": {
    // backgroundColor: theme.palette.secondary.main,
    // border: "1px solid white",
    boxShadow: "0 0 10px #537FE7, 0 0 10px #537FE7, 0 0 10px #537FE7", // neon blue glow
  },
  "&:focus": {
    outline: "none",
  },
  height: "30px",
  margin: "0 10px",
}));

const NavigationBar = ({ page }) => {
  const [open, setOpen] = useState(false);

  const themeUsed = useTheme();
  const isMobile = useMediaQuery(themeUsed.breakpoints.down("md"));

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(isOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "theme.palette.primary.main" }}
      >
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
                    backgroundColor: "black", // set background color to black
                    boxShadow:
                      "0 0 10px #537FE7, 0 0 20px #537FE7, 0 0 30px #537FE7", // apply the glow effect
                  },
                }}
              >
                <StyledStack
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <NavigationLink to="/discover">
                    <NavigationButton
                      style={
                        page === "discover"
                          ? { backgroundColor: "#537FE7" }
                          : null
                      }
                    >
                      Discover
                    </NavigationButton>
                  </NavigationLink>
                  <NavigationLink to="/liked">
                    <NavigationButton
                      style={
                        page === "liked" ? { backgroundColor: "#537FE7" } : null
                      }
                    >
                      Liked
                    </NavigationButton>
                  </NavigationLink>
                  <NavigationLink to="/top-tracks">
                    <NavigationButton
                      style={
                        page === "top-tracks"
                          ? { backgroundColor: "#537FE7" }
                          : null
                      }
                    >
                      Top Tracks
                    </NavigationButton>
                  </NavigationLink>
                  <NavigationLink to="/top-artists">
                    <NavigationButton
                      style={
                        page === "top-artists"
                          ? { backgroundColor: "#537FE7" }
                          : null
                      }
                    >
                      Top Artists
                    </NavigationButton>
                  </NavigationLink>
                  <NavigationLink to="/forums">
                    <NavigationButton
                      style={
                        page === "forums"
                          ? { backgroundColor: "#537FE7" }
                          : null
                      }
                    >
                      Forums
                    </NavigationButton>
                  </NavigationLink>
                  <NavigationLink to="/chat">
                    <NavigationButton
                      style={
                        page === "chat" ? { backgroundColor: "#537FE7" } : null
                      }
                    >
                      Chat
                    </NavigationButton>
                  </NavigationLink>
                  <NavigationLink to="/profile">
                    {/* <Person2Icon sx={{ color: "white" }} /> */}
                    <NavigationButton
                      style={
                        page === "profile"
                          ? { backgroundColor: "#537FE7" }
                          : null
                      }
                    >
                      Profile
                    </NavigationButton>
                  </NavigationLink>
                  <NavigationLink to="/">
                    <NavigationButton style={{ backgroundColor: "#643b9f" }}>
                      Logout
                    </NavigationButton>
                  </NavigationLink>
                </StyledStack>
              </SwipeableDrawer>
            </>
          ) : (
            <>
              <NavigationLink to="/discover">
                <NavigationButton
                  style={
                    page === "discover" ? { backgroundColor: "#537FE7" } : null
                  }
                >
                  Discover
                </NavigationButton>
              </NavigationLink>
              <NavigationLink to="/liked">
                <NavigationButton
                  style={
                    page === "liked" ? { backgroundColor: "#537FE7" } : null
                  }
                >
                  Liked
                </NavigationButton>
              </NavigationLink>
              <NavigationLink to="/top-tracks">
                <NavigationButton
                  style={
                    page === "top-tracks"
                      ? { backgroundColor: "#537FE7" }
                      : null
                  }
                >
                  Top Tracks
                </NavigationButton>
              </NavigationLink>
              <NavigationLink to="/top-artists">
                <NavigationButton
                  style={
                    page === "top-artists"
                      ? { backgroundColor: "#537FE7" }
                      : null
                  }
                >
                  Top Artists
                </NavigationButton>
              </NavigationLink>
              <NavigationLink to="/forums">
                <NavigationButton
                  style={
                    page === "forums" ? { backgroundColor: "#537FE7" } : null
                  }
                >
                  Forums
                </NavigationButton>
              </NavigationLink>
              <NavigationLink to="/chat">
                <NavigationButton
                  style={
                    page === "chat" ? { backgroundColor: "#537FE7" } : null
                  }
                >
                  Chat
                </NavigationButton>
              </NavigationLink>
              <NavigationLink to="/profile">
                {/* <Person2Icon sx={{ color: "white" }} /> */}
                <NavigationButton
                  style={
                    page === "profile" ? { backgroundColor: "#537FE7" } : null
                  }
                >
                  Profile
                </NavigationButton>
              </NavigationLink>
              <NavigationLink to="/">
                <NavigationButton style={{ backgroundColor: "#643b9f" }}>
                  Logout
                </NavigationButton>
              </NavigationLink>
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavigationBar;
