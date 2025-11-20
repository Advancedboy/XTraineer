export class CreateCompletedWorkoutDto {
  planId?: number;
  startedAt: Date;
  finishedAt?: Date;
  notes?: string;
}
