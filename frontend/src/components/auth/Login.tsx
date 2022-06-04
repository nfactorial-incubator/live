import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = () => {
    axios
      .post("http://localhost:8080/auth/login", {
        username,
        password,
      })
      .then((resp) => {
        if (resp.status === 200) {
          localStorage.setItem("token", resp.data.token);
          navigate("/protected");
            //TODO: show success notification

        }
        console.log(resp.data);
      }).catch((err) => {
          alert('error happened!')
      });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form>
        <Typography variant="h6" component="h2">
          Логин
        </Typography>
        <div style={{ marginBottom: 12 }}>
          <TextField
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            id="outlined-basic"
            label="username"
            variant="outlined"
            size="small"
          />
        </div>
        <div>
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-basic"
            label="password"
            variant="outlined"
            size="small"
            type="password"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={onSubmit} variant="text">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};
