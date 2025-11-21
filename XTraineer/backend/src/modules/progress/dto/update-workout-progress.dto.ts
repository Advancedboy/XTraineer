import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateWorkoutProgressDto {
  @IsOptional()
  @IsNumber()
  exerciseId?: number;

  @IsOptional()
  @IsNumber()
  completedWorkoutId?: number;

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
