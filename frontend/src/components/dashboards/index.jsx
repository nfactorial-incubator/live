import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { DashboardGrid } from "../dashboard-grid";
import { DashboardRaspberry } from "../dashboard-raspberry";

export const Dashboards = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5">Дэшборды</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <DashboardGrid />
      </Grid>

      <Grid item xs={12}>
        <Typography color="red">Наша золотая малина</Typography>
        <DashboardRaspberry />
      </Grid>
    </Grid>
  );
};
