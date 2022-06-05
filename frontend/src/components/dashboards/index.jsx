import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { DashboardGrid } from "../dashboard-grid";

export const Dashboards = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h5">Дэшборды</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <DashboardGrid />
      </Grid>
    </Grid>
  );
};
