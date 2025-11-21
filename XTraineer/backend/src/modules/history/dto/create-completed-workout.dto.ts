import {
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
  ValidateNested,
  IsArray,
} from "class-validator";
import { Type } from "class-transformer";

class CompletedWorkoutResultInput {
  @IsNumber()
  exerciseId: number;

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

export class CreateCompletedWorkoutDto {
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsNumber()
  planId?: number;

  @IsDateString()
  startedAt: string;

  @IsOptional()
  @IsDateString()
  finishedAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CompletedWorkoutResultInput)
  results?: CompletedWorkoutResultInput[];
}
