import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useParams } from "react-router-dom";
import CountdownTimer from "../../components/CountdownTimer";

export const Event = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState();

  useEffect(() => {
    getEventData();
  }, []);

  const getEventData = async () => {
    try {
      const event = await api.get(`/api/event/${eventId}`);
      setEventData(event.data);
    } catch (error) {
      alert(error.response.data.message ?? error);
    }
  };

  const register = async () => {
    try {
      const event = await api.post(`/api/event/${eventId}/register`);
      setEventData(event.data);
    } catch (error) {
      alert(error.response.data.message ?? error);
    }
  };

  const unregister = async () => {
    try {
      const event = await api.delete(`/api/event/${eventId}/register`);
      setEventData(event.data);
    } catch (error) {
      alert(error.response.data.message ?? error);
    }
  };

  return (
    <div>
      {eventData ? (
        <>
          <h1>{eventData.title}</h1>
          <p>{eventData.description}</p>
          <p>
            Registered users: <b> {eventData.registeredUsersCount}</b>
          </p>
          <p>Time left until event:</p>
          <CountdownTimer targetDate={new Date(eventData.startDate)} />
          {eventData.isRegistered ? (
            <div>
              <p>You are already registered!</p>
              <button onClick={unregister}>Unregister</button>
            </div>
          ) : (
            <div>
              <p>Join us!</p>
              <button onClick={register}>Register</button>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
