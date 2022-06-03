import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ReactComponent as DefaultError } from "../../assets/error_icon.svg";

export const ErrorComponent = () => {
  return (
    <Grid container justifyContent="center" spacing={1}>
      <Grid item display="flex" flexDirection="column" alignItems="center">
        <DefaultError width={100} height={100} />
        <Typography variant="caption">
          An unfortunate and unexpected error has occured(
        </Typography>
      </Grid>
    </Grid>
  );
};
