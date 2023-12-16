import { api } from "./axios";

export const login = (email, password, kind) => {
  const endpoint =
    kind == "expert" ? "/v1/auth/expert/login" : "/v1/auth/login";
  return api.post(endpoint, {
    email,
    password,
  });
};

export const signup = (email, password, kind, firstName, lastName) => {
  const endpoint =
    kind == "expert" ? "/v1/auth/expert/register" : "v1/auth/register";

  return api.post(endpoint, {
    name: firstName + " " + lastName,
    email,
    password,
  });
};
