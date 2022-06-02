import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const AuthenticationDialog = () => {
  const [open, setOpen] = React.useState(true);

  const handleSubmit = () => {
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
    <Dialog open={open}>
      <DialogTitle>Регистрация</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Зарегистрируйтесь перед началом работы в инкубаторе
        </DialogContentText>

        {fields.map((field) => (
          <TextField
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
        <Button onClick={handleSubmit}>Зарегистрироваться!</Button>
      </DialogActions>
    </Dialog>
  );
};
