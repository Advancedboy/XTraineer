import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  age: number;

  @IsNumber()
  @Min(0)
  height: number; // рост в см или м, как решишь

  @IsNumber()
  @Min(0)
  weight: number; // вес в кг

  @IsString()
  gender: "male" | "female" | "other";
}
