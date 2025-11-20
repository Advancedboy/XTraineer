import { IsString, IsOptional } from "class-validator";

export class CreateSportTypeDto {
  @IsString()
  key: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
