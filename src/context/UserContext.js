import { useState, useContext, createContext } from "react";

const UserContext = createContext([
  {
    tokens: {},
  },
  (obj) => obj,
]);

export default UserContext;
