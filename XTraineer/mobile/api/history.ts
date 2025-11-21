import { api } from "../api";

export const historyApi = {
  getAll: async (token: string) => {
    const res = await api.get("/completed-workout", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};
