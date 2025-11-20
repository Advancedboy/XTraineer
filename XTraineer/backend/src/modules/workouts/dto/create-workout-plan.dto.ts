import { IsString, IsBoolean, IsInt, IsOptional } from "class-validator";

export class CreateWorkoutPlanDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsInt()
  sportTypeId: number;
}
