import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { WorkoutPlanService } from "./workout-plan.service";
import { CreateWorkoutPlanDto } from "./dto/create-workout-plan.dto";
import { UpdateWorkoutPlanDto } from "./dto/update-workout-plan.dto";

@Controller("workout-plans")
export class WorkoutPlanController {
  constructor(private service: WorkoutPlanService) {}

  @Post()
  create(@Body() dto: CreateWorkoutPlanDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateWorkoutPlanDto) {
    return this.service.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
