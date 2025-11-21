import { IsOptional, IsInt, IsString } from "class-validator";

export class UpdateWorkoutResultDto {
  @IsOptional()
  @IsInt()
  exerciseId?: number;

  @IsOptional()
  @IsInt()
  completedWorkoutId?: number;

  @IsOptional()
  @IsInt()
  setsDone?: number;

  @IsOptional()
  @IsInt()
  repsPerSet?: number;

  @IsOptional()
  weightKg?: number;

  @IsOptional()
  durationSec?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
