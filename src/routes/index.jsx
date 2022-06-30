import { Routes, Route } from "react-router-dom";
import { IsAuth } from "../components/IsAuth";
import { CheckInOut } from "../pages/CheckInOut";
import { Event } from "../pages/Event";
import { Events } from "../pages/Events";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Profile } from "../pages/Profile";
import { Register } from "../pages/Register";
import { User } from "../pages/User";
import { Users } from "../pages/Users";
import { PrivateRoute } from "./PrivateRoute.jsx";
import { PublicRoute } from "./PublicRoute";
import { NotFound } from "../pages/NotFound";
import { Project } from "../pages/Project";
import { Projects } from "../pages/Projects";

export const RouteList = () => (
  <Routes>
    <Route
      path="/"
      element={
        <PublicRoute>
          <Home />
        </PublicRoute>
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
      path="/events/:eventId"
      element={
        <PrivateRoute redirectTo="/login">
          <Event />
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
        <PrivateRoute redirectTo="/login">
          <Users />
        </PrivateRoute>
      }
    />

    <Route
      path="/projects"
      element={
        <PrivateRoute redirectTo="/login">
          <Projects />
        </PrivateRoute>
      }
    />

    <Route
      path="/project/:slug"
      element={
        <PrivateRoute redirectTo="/login">
          <Project />
        </PrivateRoute>
      }
    />

    <Route
      path="/user/:nickname"
      element={
        <PrivateRoute redirectTo="/login">
          <User />
        </PrivateRoute>
      }
    />

    <Route path="*" element={<NotFound />} />
  </Routes>
);
