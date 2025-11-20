import axios from "axios";
const API_URL = "http://localhost:3000";

export const login = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${API_URL}/auth/login`, data);
  return res.data; // { token }
};

export const register = async (data: any) => {
  const res = await axios.post(`${API_URL}/users/register`, data);
  return res.data;
};
