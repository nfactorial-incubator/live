/**
 * Composing <Route> in React Router v6
 * https://gist.github.com/mjackson/d54b40a094277b7afdd6b81f51a0393f
 *
 * Upgrading from v5
 * https://reactrouter.com/docs/en/v6/upgrading/v5
 */
import { Routes, Route } from "react-router-dom";
import { CheckInOut } from "../pages/CheckInOut";
import { Events } from "../pages/Events";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Profile } from "../pages/Profile";
import { Register } from "../pages/Register";
import { Users } from "../pages/Users";
import { PrivateRoute } from "./PrivateRoute.jsx";
import { PublicRoute } from "./PublicRoute";

export const RouteList = () => (
  <Routes>
    <Route
      path="/"
      element={
        <PrivateRoute redirectTo="/login">
          <Home />
        </PrivateRoute>
      }
    />

    <Route
      path="/login"
      element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      }
    />

    <Route
      path="/register"
      element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      }
    />

    <Route
      path="/check-in-out"
      element={
        <PrivateRoute redirectTo="/login">
          <CheckInOut />
        </PrivateRoute>
      }
    />

    <Route
      path="/events"
      element={
        <PrivateRoute redirectTo="/login">
          <Events />
        </PrivateRoute>
      }
    />

    <Route
      path="/events/blind-pp"
      element={
        <PrivateRoute redirectTo="/login">
          <h1>Blind Pair Programming Event</h1>
        </PrivateRoute>
      }
    />

    <Route
      path="/profile"
      element={
        <PrivateRoute redirectTo="/login">
          <Profile />
        </PrivateRoute>
      }
    />

    <Route
      path="/users"
      element={
        <PrivateRoute permissions={["users.list", "users.create"]}>
          <Users />
        </PrivateRoute>
      }
    />

    <Route
      path="/users/:id"
      element={
        <PrivateRoute permissions={["users.list", "users.create"]}>
          <Users />
        </PrivateRoute>
      }
    />

    <Route path="*" element={<h1>404</h1>} />
  </Routes>
);
