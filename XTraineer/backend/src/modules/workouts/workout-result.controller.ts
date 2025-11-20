import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { WorkoutResultService } from "./workout-result.service";
import { CreateWorkoutResultDto } from "./dto/create-workout-result.dto";
import { UpdateWorkoutResultDto } from "./dto/update-workout-result.dto";

@Controller("workout-results")
export class WorkoutResultController {
  constructor(private service: WorkoutResultService) {}

  @Post()
  create(@Body() dto: CreateWorkoutResultDto) {
    return this.service.createStandalone(dto);
  }

  @Post(":completedWorkoutId")
  createForCompleted(
    @Param("completedWorkoutId") completedWorkoutId: string,
    @Body() dto: CreateWorkoutResultDto
  ) {
    return this.service.create(+completedWorkoutId, dto);
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
  update(@Param("id") id: string, @Body() dto: UpdateWorkoutResultDto) {
    return this.service.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
