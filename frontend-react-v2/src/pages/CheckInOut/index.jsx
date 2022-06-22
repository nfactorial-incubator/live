import React, { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";

export const CheckInOut = () => {
  const [lastCheck, setLastCheck] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    getLastCheck();
  }, []);

  useEffect(() => {
    if (lastCheck) {
      setStatus(
        `${lastCheck.type === "in" ? "В универе" : "Дома"} с ${new Date(
          lastCheck.createdAt
        ).toLocaleTimeString([], {
          hour12: false,
        })}`
      );
    }
  }, [lastCheck]);

  const getLastCheck = async () => {
    try {
      const response = await api.get("/api/check/last");
      setLastCheck(response.data.lastCheck);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const onCheckIn = async () => {
    try {
      const response = await api.post("/api/check/in");
      setLastCheck(response.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const onCheckOut = async () => {
    try {
      const response = await api.post("/api/check/out");
      setLastCheck(response.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Check In / Check Out</h1>
      <p>Current status: {status}</p>
      {!lastCheck && <p>Loading...</p>}
      {lastCheck && lastCheck.type === "out" && (
        <button onClick={onCheckIn}>Check In</button>
      )}
      {lastCheck && lastCheck.type === "in" && (
        <button onClick={onCheckOut}>Check Out</button>
      )}
    </div>
  );
};
