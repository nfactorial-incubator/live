import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useCreateAssignmentMutation } from "../../../slices/homeworksSlice";
import { ReactComponent as DefaultLoader } from "../../../assets/bean_eater.svg";

const FORM_ID = "create_hometask_form";

export const CreateHometask = () => {
  const [createAssignment, { isLoading }] = useCreateAssignmentMutation();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const submit = handleSubmit(async (data) => {
    createAssignment(data);
  });

  if (isLoading) return <DefaultLoader />;

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
