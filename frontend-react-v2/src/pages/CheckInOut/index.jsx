import React, { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";

export const CheckInOut = () => {
  const [status, setStatus] = useState("checkIn");
  const [statusText, setStatusText] = useState("");

  const onCheckIn = async () => {
    try {
      const response = await api.post("/api/check/in");
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const onCheckOut = async () => {
    try {
      const response = await api.post("/api/check/out");
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Check In / Check Out</h1>
      <p>Current status: {statusText}</p>
      {/* {status === "loading" && <p>Loading...</p>}
      {status === "checkIn" && <button onClick={onCheckIn}>Check In</button>}
      {status === "checkOut" && <button onClick={onCheckOut}>Check Out</button>} */}
      <button onClick={onCheckIn}>Check In</button>
      <button onClick={onCheckOut}>Check Out</button>
    </div>
  );
};
