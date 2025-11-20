import { IsString, IsInt, IsOptional, IsNumber } from "class-validator";

export class CreateWorkoutExerciseDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsInt()
  sets?: number;

  @IsOptional()
  @IsInt()
  reps?: number;

  @IsOptional()
  @IsNumber()
  targetWeightKg?: number;

  @IsOptional()
  @IsInt()
  targetDurationSec?: number;
}
