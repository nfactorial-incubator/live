import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";
import { Link } from "react-router-dom";

export const HometaskCard = ({ hometask }) => {
  const isMentor = true;
  const token = "asd";

  const description =
    hometask.description.length > 32
      ? hometask.description.slice(0, 32) + "..."
      : hometask.description;

  const deleteHometask = async (id) => {
    await axios.delete(`http://127.0.0.1:8080/api/hw/assignment/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });
  };

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
        {isMentor && (
          <IconButton onClick={() => deleteHometask(hometask._id)}>
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};
