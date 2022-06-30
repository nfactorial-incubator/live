import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import { Navbar, Dropdown } from "flowbite-react";

export const NavBar = () => {
  const { user, signOut, isAuthenticated } = useContext(AuthContext);

  const StudentNavBarV2 = () => {
    return (
      <div className="grid grid-cols-6 my-6">
        <div className="flex flex-row justify-between col-start-3 col-span-2 ">
          <NavLink to="/projects">
            <img src={logo} className="mr-3 h-6 sm:h-9" />
          </NavLink>
          {user && (
            <Dropdown
              class="border border-gray-300 hover:bg-gray-50 text-gray-800 rounded-md"
              arrowIcon={false}
              inline={false}
              label={
                <div className="flex flex-row gap-1 place-content-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 self-center"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <div className="text-md font-regular">{user.nickname}</div>
                </div>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {user.firstname} {user.lastname}
                </span>
                <span className="block truncate text-sm font-medium">
                  {user.nickname}
                </span>
              </Dropdown.Header>
              <Dropdown.Item onClick={() => signOut()}>Logout</Dropdown.Item>
            </Dropdown>
          )}
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
