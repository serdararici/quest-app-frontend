import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Box,
  Container,
  FormHelperText,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PostWithoutAuth } from "../../services/HttpService";

function Auth() {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleUserName = (value) => {
    setUserName(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const sendRequest = async (path) => {
    try {
      const res = await PostWithoutAuth(("/api/auth/" + path), {
            userName : userName, 
            password : password,
          });

      if (!res.ok) {
        console.error("HTTP Error", res.status);
        return;
      }

      const result = await res.json();
      localStorage.setItem("tokenKey", result.accessToken);
      localStorage.setItem("refreshKey", result.refreshToken);
      localStorage.setItem("currentUser", result.userId);
      localStorage.setItem("userName", userName);

      if (path === "login") {
        navigate("/");
      } else {
        navigate("/auth");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };


  const handleButton = (path) => {
    sendRequest(path);
    setUserName("");
    setPassword("");
  };


  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          padding: 4,
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <FormControl fullWidth variant="standard">
          <InputLabel>UserName</InputLabel>
          <Input onChange={(i) => handleUserName(i.target.value)} />
        </FormControl>

        <FormControl fullWidth variant="standard">
          <InputLabel>Password</InputLabel>
          <Input
            type="password"
            onChange={(i) => handlePassword(i.target.value)}
          />
        </FormControl>

        <Button
          variant="contained"
          sx={{
            background:
              "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            color: "#fff",
          }}
          onClick={() => handleButton("register")}
        >
          Register
        </Button>
        <FormHelperText>Are you already registered?</FormHelperText>
        <Button
          variant="contained"
          sx={{
            background:
              "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            color: "#fff",
          }}
          onClick={() => handleButton("login")}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default Auth;