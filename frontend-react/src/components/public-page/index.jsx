import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

import { Grid, Typography } from "@mui/material";
import { DashboardGrid } from "../dashboard-grid";
import { PublicAppBar } from "../public-app-bar";

export const PublicPage = () => {
  let auth = useAuth();

  let navigate = useNavigate();

  // if (!auth.user) {
  //   return <p>You are not logged in.</p>;
  // }

  return (
    <Grid
      style={{ marginTop: "2rem" }}
      container
      alignItems="center"
      spacing={1}
      flexDirection="column"
    >
      <Grid item>
        <Typography>Дэшборды</Typography>
      </Grid>
      <Grid item xs={10}>
        <DashboardGrid />
      </Grid>
    </Grid>
  );
};
