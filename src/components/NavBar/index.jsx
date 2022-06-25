import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { CanAccess } from "../CanAccess";
import { IsAuth } from "../IsAuth";

export function NavBar() {
  const { user, signOut, isAuthenticated } = useContext(AuthContext);

  const GuestNavBar = () => {
    return (
      <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </>
    );
  };

  const StudentNavBar = () => {
    return (
      <>
        <Link to="/">Home</Link>
        <Link to="/check-in-out">CheckInOut</Link>
        <Link to="/events">Events</Link>
        <Link to="/users">Users</Link>
        <Link to="/profile">Profile</Link>
        <>
          <span>Welcome, {user?.nickname}!</span>
          <button onClick={() => signOut()}>Logout</button>
        </>
      </>
    );
  };

  const mentorNavbar = () => {
    return <></>;
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {isAuthenticated ? <StudentNavBar /> : <GuestNavBar />}
    </div>
  );
}
