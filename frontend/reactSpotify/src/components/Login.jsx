import LoginIcon from "@mui/icons-material/Login";
import { styled, Button } from "@mui/material";
import { Helmet } from "react-helmet";
import logo from "../assets/logo.png";

const Login = () => {
  const LoginButton = styled(Button)(({ theme }) => ({
    color: "black",
    backgroundColor: "white",
    fontWeight: "bold",
    "&:hover": {
      //   color: theme.palette.secondary.main,
      color: "white",
      boxShadow: "0 0 10px #537FE7, 0 0 20px #537FE7, 0 0 30px #537FE7",
      backgroundColor: "#1DB954",
      outline: "solid 1px black",
    },
    "&:focus": {
      outline: "black",
    },
    // height: "30px",
    margin: "30px 10px 20px 10px",
  }));

  const handleLogin = () => {
    window.location.href = "http://localhost:3000/spotify/login";
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      {/* <div className="view-container"></div> */}
      <div className="view-container">
        <div className="cards-container">
          <div className="top-card" style={{ backgroundColor: "transparent" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1540/1540794.png"
              style={{ marginBottom: "0" }}
            ></img>
          </div>
        </div>
      </div>

      <div className="blue-container">
        <h1 className="welcome-text">Welcome to Spotify Social!</h1>
        <div className="shadow-container">
          <h3>
            To use our app, you must sign in with your Spotify account by
            clicking the button below
          </h3>
        </div>
        <LoginButton
          onClick={handleLogin}
        >
          <LoginIcon style={{ marginRight: "10px" }} />
          Login with Spotify
        </LoginButton>
      </div>
    </>
  );
};

export default Login;
