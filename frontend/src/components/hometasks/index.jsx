import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { AllHometasks } from "./all-hometasks";
import { CreateHometask } from "./create-hometask";

import { Outlet, useParams } from "react-router-dom";

export const Hometasks = () => {
  const { hometaskID } = useParams();

  const isMentor = true;

  if (hometaskID) return <Outlet />;

  return (
    <Grid container spacing={3}>
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
