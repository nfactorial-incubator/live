import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useParams, useLocation } from "react-router-dom";

export const Event = () => {
  const { eventId } = useParams();
  const { state: eventData } = useLocation();
  return (
    <div>
      <h1>{eventData.title}</h1>
      <h3>{eventId}</h3>
      <p>{eventData.description}</p>
    </div>
  );
};
