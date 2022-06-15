import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";
import { ReactComponent as DefaultLoader } from "../../assets/bean_eater.svg";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../slices/loginSlice";

const FORM_ID = "login_form";

export const Login = () => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleClose = () => {
    navigate("/");
    setOpen(false);
  };

  const fields = [
    {
      name: "username",
      type: "text",
      label: "Введите имя пользователя",
    },
    {
      name: "password",
      type: "password",
      label: "Введите пароль",
    },
  ];

  const submit = handleSubmit(async (data) => {
    login(data)
      .unwrap()
      .then((resp) => {
        localStorage.setItem("nf-token", resp.token);
        navigate("/classroom");
      });
  });

  if (isLoading)
    return (
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} height={1000}>
          <DefaultLoader />
        </Grid>
      </Grid>
    );

  return (
    <Dialog open={open} onClose={handleClose}>
      <form id={FORM_ID} onSubmit={submit}>
        <DialogTitle>Войти в инкубатор</DialogTitle>
        <DialogContent>
          {fields.map((field) => (
            <TextField
              {...register(field.name)}
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
            Войти!
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
