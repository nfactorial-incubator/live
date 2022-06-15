import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ReactComponent as DefaultLoader } from "../../assets/bean_eater.svg";
import { ErrorComponent } from "../error-component";

import { Link } from "react-router-dom";
import { useGetOnlyMeQuery } from "../../slices/getAllUsersSlice";
import { useDeleteAssignmentMutation } from "../../slices/homeworksSlice";

export const HometaskCard = ({ hometask }) => {
  const { data } = useGetOnlyMeQuery();
  const [deleteAssignment, { isLoading, isError }] =
    useDeleteAssignmentMutation();

  const description =
    hometask.description.length > 32
      ? hometask.description.slice(0, 32) + "..."
      : hometask.description;

  if (isLoading) return <DefaultLoader />;

  if (isError) return <ErrorComponent />;

  return (
    <Card sx={{ maxWidth: 200, maxHeight: 250 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {hometask.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={hometask._id}>
          Описание
        </Button>
        {data && data.role === "mentor" && (
          <IconButton onClick={() => deleteAssignment(hometask._id)}>
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};
