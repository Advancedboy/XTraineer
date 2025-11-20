import { PartialType } from "@nestjs/mapped-types";
import { CreateSportTypeDto } from "./create-sport-type.dto";

export class UpdateSportTypeDto extends PartialType(CreateSportTypeDto) {}
