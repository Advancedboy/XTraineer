export class CreateWorkoutResultDto {
  completedWorkoutId: number;
  exerciseId: number;
  weight?: number;
  reps?: number;
  sets?: number;
  duration?: number;
}
