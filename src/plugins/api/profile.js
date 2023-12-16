import { api } from "./axios";

export const saveExpertProfile = (token, data) => {
  console.log(">", data);
  return Promise.all([
    api.post("/v1/experts/personal-info", data["personal-info"], {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }),
    api.post(
      "/v1/experts/summary",
      { summary: data["summary"] },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ),
    api.post(
      "/v1/experts/experience",
      { experience: Object.values(data["experience"]) },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  ]);
};

export const getProfile = (token, id) => {
  return api.get(`/v1/experts/profileById/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      // Add more headers as needed
    },
  });
};
