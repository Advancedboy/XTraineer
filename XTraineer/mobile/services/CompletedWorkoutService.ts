import { api } from "../api";

export const getCompletedWorkouts = () => api.get("/completed-workout");
export const getCompletedWorkout = (id: number) =>
  api.get(`/completed-workout/${id}`);
export const createCompletedWorkout = (data: any) =>
  api.post("/completed-workout", data);
export const updateCompletedWorkout = (id: number, data: any) =>
  api.patch(`/completed-workout/${id}`, data);
export const deleteCompletedWorkout = (id: number) =>
  api.delete(`/completed-workout/${id}`);
