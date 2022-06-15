import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export const Ideas = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h5">Идеи</Typography>
        <Divider />
      </Grid>
    </Grid>
  );
};
