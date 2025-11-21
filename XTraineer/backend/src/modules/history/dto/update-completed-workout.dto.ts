import { IsOptional, IsInt, IsString, IsDateString } from "class-validator";

export class UpdateCompletedWorkoutDto {
  @IsOptional()
  @IsDateString()
  startedAt?: string;

  @IsOptional()
  @IsDateString()
  finishedAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsInt()
  planId?: number;
}
