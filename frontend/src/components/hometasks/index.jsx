import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { AllHometasks } from "./all-hometasks";
import { CreateHometask } from "./create-hometask";

export const Hometasks = () => {
  const isMentor = true;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h5">Домашки</Typography>
        <Divider />
      </Grid>

      {isMentor && (
        <Grid item>
          <CreateHometask />
        </Grid>
      )}
      <Grid item xs={12}>
        <AllHometasks />
      </Grid>
    </Grid>
  );
};
