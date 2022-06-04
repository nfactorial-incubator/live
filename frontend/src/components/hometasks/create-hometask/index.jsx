import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const CreateHometask = () => {
  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item>
        <TextField label="Создать новую домашку" />
      </Grid>
      <Grid item>
        <TextField multiline label="Описание" style={{ minWidth: "400px" }} />
      </Grid>
      <Grid item>
        <Button onClick>Создать</Button>
      </Grid>
    </Grid>
  );
};
