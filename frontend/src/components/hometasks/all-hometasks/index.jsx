import Grid from "@mui/material/Grid";
import { useGetAllOfthemQuery } from "../../../slices/getAllAssignments";
import { ReactComponent as DefaultLoader } from "../../../assets/bean_eater.svg";
import { ErrorComponent } from "../../error-component";
import { HometaskCard } from "../../hometask-card";

export const AllHometasks = () => {
  const {
    data: allHometasks = [],
    isLoading,
    isError,
  } = useGetAllOfthemQuery();

  if (isLoading) return <DefaultLoader />;

  if (isError) return <ErrorComponent />;

  return (
    <Grid container spacing={3}>
      {allHometasks.map((hometask) => (
        <Grid key={hometask._id} item display="flex" alignItems="flex-start">
          <HometaskCard {...{ hometask }} />
        </Grid>
      ))}
    </Grid>
  );
};
