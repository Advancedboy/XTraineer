import axios from "axios";

const API_URL = "http://192.168.10.109:3000";

export const authApi = {
  login: async (email: string, password: string) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    return res.data; // обычно { accessToken, user }
  },

  register: async (email: string, password: string, name: string) => {
    const res = await axios.post(`${API_URL}/auth/register`, {
      email,
      password,
      name,
    });
    return res.data;
  },
};
