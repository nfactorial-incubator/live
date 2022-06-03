import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const CardComponent = ({ hometask }) => {
  const description =
    hometask.description.length > 32
      ? hometask.description.slice(0, 32) + "..."
      : hometask.description;

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
        <Button size="small">Описание</Button>
      </CardActions>
    </Card>
  );
};
