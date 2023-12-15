import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import SearchPage from "./pages/search";
import Profile from "./pages/profile";
import Onboarding from "./pages/onboarding";

import UserContext from "./context/UserContext";

const App = () => {
  const userState = useState({
    expert: {
      firstName: "",
      lastName: "",
      industry: "",
      country: "",
      state: "",
      city: "",
      language: "",
      summary: "",
      email: "",
      experience: [],
      expertise: [],
      id: "",
    },
    tokens: {},
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/search",
      element: <SearchPage />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/onboarding",
      element: <Onboarding />,
    },
    {
      path: "/profile/:id",
      element: <Profile />,
    },
  ]);

  return (
    <UserContext.Provider value={userState}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
