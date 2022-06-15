import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export const Submissions = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5">Домашки</Typography>
        <Divider />
      </Grid>
    </Grid>
  );
};
