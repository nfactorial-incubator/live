import * as React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { ReactComponent as DefaultLoader } from "../../assets/bean_eater.svg";
import { ErrorComponent } from "../error-component";

import { useGetAssignmentQuery } from "../../slices/homeworksSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSubmitAssignmentMutation } from "../../slices/homeworksSlice";

const FORM_ID = "submit_assignment";

export const HometaskPage = () => {
  const navigate = useNavigate();
  const { hometaskID } = useParams();

  const [submitAssignment, { isLoading: isSubmissionLoading }] =
    useSubmitAssignmentMutation();

  const {
    isLoading,
    isError,
    data: assignment,
    isSuccess,
  } = useGetAssignmentQuery(hometaskID);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const submit = handleSubmit(async (data) => {
    submitAssignment({
      title: assignment.title,
      assignmentId: assignment._id,
      ...data,
    })
      .unwrap()
      .then((resp) => {
        navigate(-1);
      });
  });

  if (isLoading || isSubmissionLoading) return <DefaultLoader />;

  if (isError) return <ErrorComponent />;

  if (isSuccess)
    return (
      <form id={FORM_ID} onSubmit={submit}>
        <Grid container spacing={3} flexDirection="column">
          <Grid item>
            <IconButton onClick={() => navigate(-1)}>
              <KeyboardBackspaceIcon htmlColor="#e01425" />
            </IconButton>
          </Grid>

          <Grid item>
            <Typography variant="h5" component="div">
              {assignment.title}
            </Typography>
          </Grid>

          <Grid item>
            <Typography color="text.secondary">
              {assignment.description}
            </Typography>
          </Grid>

          <Grid item>
            <TextField
              {...register("description")}
              autoFocus
              id="title"
              label="Опишите своё домашнее задание, приложив файлы если нужно"
              type="text"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item>
            <Button type="submit" form={FORM_ID}>
              Сдать домашку
            </Button>
          </Grid>
        </Grid>
      </form>
    );
};
