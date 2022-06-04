import {
  Button,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState('');
  const [fullname, setFullName] = useState("");

  const navigate = useNavigate();
  const onSubmit = () => {
    axios
      .post("http://localhost:8080/auth/register", {
        username,
        password,
        role,
        fullname
      })
      .then((resp) => {
          if (resp.status === 201) {
            navigate('/auth/login') 
            //TODO: show success notification
          }
          else {
              alert('error occured')
          }
      }).catch((err) => {
        alert('error occured')
      } );
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
          Регистрация
        </Typography>
        <div style={{ marginBottom: 12 }}>
          <TextField
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            id="outlined-basic"
            label="full name"
            variant="outlined"
            size="small"
            value={fullname}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <TextField
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            id="outlined-basic"
            label="username"
            variant="outlined"
            size="small"
          />
        </div>
        <div>
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="outlined-basic"
            label="password"
            variant="outlined"
            size="small"
            type="password"
          />
        </div>
        <FormControl
          style={{
            display: "flex",
          }}
        >
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="student"
            name="radio-buttons-group"
            onChange={(e) => {
                setRole(e.target.value);
            }}
            value={role}
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <FormControlLabel
              value="student"
              control={<Radio />}
              label="Student"
            />
            <FormControlLabel
              value="mentor"
              control={<Radio />}
              label="Mentor"
            />
          </RadioGroup>
        </FormControl>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={onSubmit} variant="text">
            Зарегистрироваться!
          </Button>
        </div>
      </form>
    </div>
  );
};
