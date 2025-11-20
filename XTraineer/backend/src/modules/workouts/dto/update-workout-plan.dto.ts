import { PartialType } from "@nestjs/mapped-types";
import { CreateWorkoutPlanDto } from "./create-workout-plan.dto";

export class UpdateWorkoutPlanDto extends PartialType(CreateWorkoutPlanDto) {}
