import { api } from "../api";

export const getWorkoutResults = () => api.get("/workout-results");
export const createWorkoutResult = (data: any) =>
  api.post("/workout-results", data);
export const createWorkoutResultForWorkout = (
  completedWorkoutId: number,
  data: any
) => api.post(`/workout-results/${completedWorkoutId}`, data);
export const updateWorkoutResult = (id: number, data: any) =>
  api.patch(`/workout-results/${id}`, data);
export const deleteWorkoutResult = (id: number) =>
  api.delete(`/workout-results/${id}`);
