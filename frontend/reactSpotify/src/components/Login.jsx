import LoginIcon from "@mui/icons-material/Login";
import { styled, Button } from "@mui/material";

const Login = () => {
  const LoginButton = styled(Button)(({ theme }) => ({
    color: "black",
    fontWeight: "bold",
    "&:hover": {
      color: theme.palette.secondary.main,
      boxShadow: "0 0 10px #537FE7, 0 0 20px #537FE7, 0 0 30px #537FE7",
    },
    "&:focus": {
      outline: "none",
    },
    height: "30px",
    margin: "0 10px",
  }));

  const handleLogin = () => {
    window.location.href = "http://localhost:3000/spotify/login";
  };

  return (
    <>
      <LoginButton onClick={handleLogin}>
        <LoginIcon />
        Login with Spotify
      </LoginButton>
    </>
  );
};

export default Login;
