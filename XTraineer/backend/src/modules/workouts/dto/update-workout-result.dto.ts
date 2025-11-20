import { PartialType } from "@nestjs/mapped-types";
import { CreateWorkoutResultDto } from "./create-workout-result.dto";

export class UpdateWorkoutResultDto extends PartialType(
  CreateWorkoutResultDto
) {}
