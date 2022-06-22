import { Link } from "react-router-dom";

export const Events = () => {
  return (
    <div>
      <h1>Events</h1>
      <ul>
        <li>
          <Link to="/events/blind-pp">Blind Pair Programming</Link>
        </li>
      </ul>
    </div>
  );
};
