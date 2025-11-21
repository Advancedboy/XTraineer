import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateWorkoutProgressDto {
  @IsNumber()
  exerciseId: number;

  @IsNumber()
  completedWorkoutId: number;

  @IsOptional()
  @IsNumber()
  setsDone?: number;

  @IsOptional()
  @IsNumber()
  repsPerSet?: number;

  @IsOptional()
  @IsNumber()
  weightKg?: number;

  @IsOptional()
  @IsNumber()
  durationSec?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
