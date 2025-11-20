import { IsInt, IsOptional, IsString, IsDateString } from "class-validator";

export class CreateCompletedWorkoutDto {
  @IsInt()
  userId: number;

  @IsOptional()
  @IsInt()
  planId?: number;

  @IsDateString()
  startedAt: string;

  @IsOptional()
  @IsDateString()
  finishedAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
