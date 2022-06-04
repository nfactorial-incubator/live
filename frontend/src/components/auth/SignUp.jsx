import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const FORM_ID = "sign_up_form";

export const SignUp = () => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullname: "",
      login: "",
      password: "",
    },
  });

  const submit = handleSubmit(async (data) => {
    await axios.postForm(
      "http://127.0.0.1:8080/api/auth/register",
      { role: "mentor", ...data },
      {
        headers: { "content-type": "application/json" },
      }
    );
  });

  const handleClose = () => {
    navigate("/");
    setOpen(false);
  };

  const fields = [
    {
      name: "fullname",
      type: "text",
      label: "Введите полное имя",
    },
    {
      name: "login",
      type: "text",
      label: "Введите имя пользователя",
    },
    {
      name: "password",
      type: "password",
      label: "Введите пароль",
    },
  ];

  return (
    <Dialog open={open} onClose={handleClose}>
      <form id={FORM_ID} onSubmit={submit}>
        <DialogTitle>Регистрация</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Зарегистрируйтесь перед началом работы в инкубаторе
          </DialogContentText>

          {fields.map((field) => (
            <TextField
              {...register(field.name)}
              name={field.name}
              key={field.name}
              autoFocus
              margin="dense"
              id={field.name}
              label={field.label}
              type={field.type}
              fullWidth
              variant="standard"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button type="submit" form={FORM_ID}>
            Зарегистрироваться!
          </Button>
        </DialogActions>{" "}
      </form>
    </Dialog>
  );
};
