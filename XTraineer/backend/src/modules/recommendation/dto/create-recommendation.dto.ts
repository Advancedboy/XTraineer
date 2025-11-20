import { IsInt, IsString, IsOptional } from "class-validator";

export class CreateRecommendationDto {
  @IsInt()
  userId: number;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  sourceRule?: string;
}
