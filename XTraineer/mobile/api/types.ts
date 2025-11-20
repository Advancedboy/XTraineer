export interface User {
  id: number;
  email: string;
  name: string;
  age?: number;
  height?: number;
  weight?: number;
  gender?: string;
}

export interface WorkoutPlan {
  id: number;
  title: string;
  description?: string;
  ownerId: number;
}

export interface CompletedWorkout {
  id: number;
  workoutId: number;
  userId: number;
  date: string;
  result?: string;
}

export interface Recommendation {
  id: number;
  userId: number;
  text: string;
}

export interface HistoryItem {
  id: number;
  workoutId: number;
  date: string;
  notes?: string;
}
