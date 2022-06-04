import * as React from "react";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";
import { Link } from "react-router-dom";
import { useGetAssignmentQuery } from "../../slices/getAssignment";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const FORM_ID = "submit_assignment";

export const HometaskPage = () => {
  const { hometaskID } = useParams();

  const {
    isLoading,
    isError,
    data: assignment,
    isSuccess,
  } = useGetAssignmentQuery(hometaskID);

  const isMentor = true;
  const token = "asd";

  const { register, handleSubmit } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const submit = handleSubmit(async (data) => {
    await axios.postForm(
      "http://127.0.0.1:8080/api/hw/submission",
      { role: "mentor", ...data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      }
    );
  });

  if (isSuccess)
    return (
      <form id={FORM_ID} onSubmit={submit}>
        <Grid container spacing={3} flexDirection="column">
          <Grid item>
            <Typography variant="h5" component="div">
              {assignment.title}
            </Typography>
          </Grid>

          <Grid item>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {assignment.description}
            </Typography>
          </Grid>

          <Grid item>
            <TextField
              {...register("title")}
              autoFocus
              margin="dense"
              id="title"
              label="Название домашки"
              type="text"
              fullWidth
              variant="standard"
            />
          </Grid>

          <Grid item>
            <TextField
              {...register("description")}
              autoFocus
              margin="dense"
              id="title"
              label="Описание"
              type="text"
              fullWidth
              variant="standard"
            />
          </Grid>

          <Button type="submit" form={FORM_ID}>
            Сдать домашку
          </Button>
        </Grid>
      </form>
    );
};
