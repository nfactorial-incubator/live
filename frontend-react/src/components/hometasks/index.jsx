import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { AllHometasks } from "./all-hometasks";
import { CreateHometask } from "./create-hometask";

import { Outlet, useParams } from "react-router-dom";
import { useGetOnlyMeQuery } from "../../slices/getAllUsersSlice";

export const Hometasks = () => {
  const { data } = useGetOnlyMeQuery();
  const { hometaskID } = useParams();

  if (hometaskID) return <Outlet />;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5">Домашки</Typography>
        <Divider />
      </Grid>

      {data && data.role === "mentor" && (
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
