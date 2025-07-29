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

  const sendRequest = (path) => {
    fetch("/api/auth/" + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("tokenKey", result.message);
        localStorage.setItem("currentUser", result.userId);
        localStorage.setItem("userName", userName);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  const handleButton = (path) => {
    sendRequest(path);
    setUserName("");
    setPassword("");
    navigate("/auth");
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





/*
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import React from "react";

function Auth() {
  return (
    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard"
      style={{ display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
        }}>
        <InputLabel>UserName</InputLabel>
        <Input></Input>
        <InputLabel style={{top: 80}}>Password</InputLabel>
        <Input style={{top:40}} type="password"></Input>
        <Button variant="contained" 
            color="white" 
            style={{ marginTop: 60, backgroundColor: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)" }}>
            Register
        </Button>
    </FormControl>

  );
}

export default Auth;
*/



/*
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import React from "react";

function Auth() {
  return (
    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard"
      style={{ display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
        }}>
        <InputLabel>UserName</InputLabel>
        <Input></Input>
        <InputLabel style={{top: 80}}>Password</InputLabel>
        <Input style={{top:40}} type="password"></Input>
        <Button variant="contained" 
            color="white" 
            style={{ marginTop: 60, backgroundColor: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)" }}>
            Register
        </Button>
    </FormControl>

  );
}

export default Auth;
*/