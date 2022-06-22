import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";

export const CheckInOut = () => {
  const [lastCheck, setLastCheck] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    getLastCheck();
    checkIfInSatbayevUniversity();
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

  const checkIfInSatbayevUniversity = async () => {
    const {
      data: { IPv4: ip },
    } = await axios.get("https://geolocation-db.com/json/");
    return true;
    return ip === "92.46.104.247";
  };

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
      const isInSatbayevUniversity = await checkIfInSatbayevUniversity();
      if (!isInSatbayevUniversity) {
        alert("Чекинится можно только из универа!");
        return;
      }
      const response = await api.post("/api/check/in");
      setLastCheck(response.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const onCheckOut = async () => {
    try {
      const isInSatbayevUniversity = await checkIfInSatbayevUniversity();
      if (!isInSatbayevUniversity) {
        alert("Чекаутится можно только из универа!");
        return;
      }
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
