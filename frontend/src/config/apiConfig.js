import axios from "axios";
export const API_BASE_URL = window.location.origin;

export const api = () => {
  const jwt = localStorage.getItem('jwt');

  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Authorization": `Bearer ${jwt}`,
      'Content-Type': "application/json"
    }
  });
};
