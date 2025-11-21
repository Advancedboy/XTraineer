import { api } from "../api";

export const workoutApi = {
  create: async (token: string, data: any) => {
    const res = await api.post("/workout-results", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};
