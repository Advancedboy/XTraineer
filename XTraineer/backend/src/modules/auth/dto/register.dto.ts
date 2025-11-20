import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsInt,
} from "class-validator";

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsInt()
  height: number;

  @IsInt()
  weight: number;

  @IsOptional()
  @IsString()
  gender?: string;
}
