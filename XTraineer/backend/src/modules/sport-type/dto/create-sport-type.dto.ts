import { SportTypeEnum } from "@prisma/client";
import { IsString, IsOptional } from "class-validator";

export class CreateSportTypeDto {
  @IsString()
  key: string;

  name: SportTypeEnum;

  @IsOptional()
  @IsString()
  description?: string;
}
