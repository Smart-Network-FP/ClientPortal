import { useState, useContext, createContext } from "react";

const UserContext = createContext([
  {
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
  },
  (obj) => obj,
]);

export default UserContext;
