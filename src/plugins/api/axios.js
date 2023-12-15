import axios from "axios";

export const api = axios.create({
  baseURL: "http://smart-network.eastus.cloudapp.azure.com:9000",
});
