import { IsString, IsInt, IsOptional, IsNumber } from "class-validator";

export class CreateWorkoutResultDto {
  @IsString()
  exerciseName: string;

  @IsOptional()
  @IsInt()
  setsDone?: number;

  @IsOptional()
  @IsInt()
  repsPerSet?: number;

  @IsOptional()
  @IsNumber()
  weightKg?: number;

  @IsOptional()
  @IsInt()
  durationSec?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
