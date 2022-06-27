import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CanAccess } from "../CanAccess";
import { IsAuth } from "../IsAuth";
import logo from "../../assets/logo.png";
import { Navbar, Dropdown } from "flowbite-react";

export const NavBar = () => {
  const { user, signOut, isAuthenticated } = useContext(AuthContext);

  const StudentNavBar = () => {
    return (
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="https://flowbite.com/">
          <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            nFactorial Incubator
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown arrowIcon={false} inline={true} label={<div>Profie</div>}>
            <Dropdown.Header>
              <span className="block text-sm">
                {user.firstname} {user.lastname}
              </span>
              <span className="block truncate text-sm font-medium">
                {user.nickname}
              </span>
            </Dropdown.Header>
            {/* <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item> */}
            {/* <Dropdown.Divider /> */}
            <Dropdown.Item onClick={() => signOut()}>Logout</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <NavLink
            to="/check-in-out"
            className={({ isActive }) =>
              isActive ? "text-blue-700" : "text-black"
            }
          >
            CheckInOut
          </NavLink>
          <NavLink
            to="/ideas"
            className={({ isActive }) =>
              isActive ? "text-blue-700" : "text-black"
            }
          >
            Ideas
          </NavLink>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  const mentorNavbar = () => {
    return <></>;
  };

  return <>{isAuthenticated ? <StudentNavBar /> : null}</>;
};
