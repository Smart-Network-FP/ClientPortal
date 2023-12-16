import { api } from "./axios";

export const getHomeExperts = (searchText = "") => {
  return api.post("/v1/elastic-search/search", {
    query: {
      searchText,
      filter: {},
    },
  });
};
