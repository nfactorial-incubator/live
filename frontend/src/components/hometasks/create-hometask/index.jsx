import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import axios from "axios";

const FORM_ID = "create_hometask_form";

export const CreateHometask = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const submit = handleSubmit(async (data) => {
    await axios.postForm("http://127.0.0.1:8080/api/hw/assignment", data, {
      headers: { "content-type": "application/json" },
    });
  });

  return (
    <form id={FORM_ID} onSubmit={submit}>
      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <TextField label="Создать новую домашку" {...register("title")} />
        </Grid>
        <Grid item>
          <TextField
            multiline
            label="Описание"
            {...register("description")}
            style={{ minWidth: "400px" }}
          />
        </Grid>
        <Grid item>
          <Button type="submit" form={FORM_ID}>
            Создать
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
