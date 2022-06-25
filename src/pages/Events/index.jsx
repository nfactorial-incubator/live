import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

export const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllEvents();
  }, []);

  const getAllEvents = async () => {
    try {
      const response = await api.get("/api/event/");
      setEvents(response.data);
    } catch (error) {
      alert(error.response.data.message ?? error);
    }
  };

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event) => {
          return (
            <li>
              <Link key={event.id} to={`/events/${event.id}`}>
                {event.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
