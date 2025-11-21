import axios from "axios";
import { CompletedWorkoutInput, WorkoutResultInput } from "./types";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://192.168.10.109:3000"; // твой локальный IP

export const workoutApi = {
  createWorkout: async (data: CompletedWorkoutInput) => {
    const token = useAuth().getToken();
    const res = await axios.post(`${API_URL}/completed-workout`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  getWorkouts: async () => {
    const token = useAuth().getToken();
    const res = await axios.get(`${API_URL}/completed-workout`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  getWorkout: async (id: number) => {
    const token = useAuth().getToken();
    const res = await axios.get(`${API_URL}/completed-workout/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};

export const workoutResultApi = {
  addResult: async (data: WorkoutResultInput) => {
    const token = useAuth().getToken();
    const res = await axios.post(`${API_URL}/workout-results`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};
