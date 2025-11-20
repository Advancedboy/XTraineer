import { PartialType } from "@nestjs/mapped-types";
import { CreateCompletedWorkoutDto } from "./create-completed-workout.dto";

export class UpdateCompletedWorkoutDto extends PartialType(
  CreateCompletedWorkoutDto
) {}
