import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ReactComponent as DefaultLoader } from "../../assets/bean_eater.svg";
import { useSignUpMutation } from "../../slices/signUpSlice";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";

const FORM_ID = "sign_up_form";

export const SignUp = () => {
  const [open, setOpen] = React.useState(true);

  const [signUp, { isLoading }] = useSignUpMutation();

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullname: "",
      username: "",
      password: "",
    },
  });

  const submit = handleSubmit(async (data) => {
    signUp(data)
      .unwrap()
      .then((resp) => {
        localStorage.setItem("nf-token", resp.token);
        navigate("/classroom");
      });
  });

  const handleClose = () => {
    // navigate("/");
    setOpen(false);
  };

  const fields = [
    {
      name: "fullname",
      type: "text",
      label: "Введите полное имя",
    },
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
        </DialogActions>
      </form>
    </Dialog>
  );
};
