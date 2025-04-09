import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const getStations = async () => {
  const response = await axios.get(`${API_URL}/stations/`);
  return response.data;
};
