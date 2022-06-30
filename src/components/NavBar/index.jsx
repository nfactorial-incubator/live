import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import { Navbar, Dropdown } from "flowbite-react";

export const NavBar = () => {
  const { user, signOut, isAuthenticated } = useContext(AuthContext);

  const StudentNavBarV2 = () => {
    return (
      <div className="grid grid-cols-4 my-6">
        <div className="flex flex-row justify-between col-start-2 col-span-2 ">
          <div className="flex flex-row ">
            <img src={logo} className="mr-3 h-6 sm:h-9" />
          </div>
          <Dropdown
            class="border border-gray-300 hover:border-gray-400 text-gray-800  rounded-md"
            arrowIcon={false}
            inline={false}
            label={<div>{user.nickname}</div>}
          >
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
        </div>
      </div>
    );
  };

  const StudentNavBar = () => {
    return (
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="https://nfactorial.live">
          <img src={logo} className="mr-3 h-6 sm:h-9" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            nFactorial Incubator
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={<div>{user.nickname}</div>}
          >
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
        {/* <Navbar.Collapse>
          <NavLink
            to="/check-in-out"
            className={({ isActive }) =>
              isActive ? "text-blue-700" : "text-black"
            }
          >
            CheckInOut
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? "text-blue-700" : "text-black"
            }
          >
            Projects
          </NavLink> */}
        {/* </Navbar.Collapse> */}
      </Navbar>
    );
  };

  return <>{isAuthenticated ? <StudentNavBarV2 /> : null}</>;
};
