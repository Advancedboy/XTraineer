import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { WorkoutExerciseService } from "./workout-exercise.service";
import { CreateWorkoutExerciseDto } from "./dto/create-workout-exercise.dto";
import { UpdateWorkoutExerciseDto } from "./dto/update-workout-exercise.dto";

@Controller("workout-exercises")
export class WorkoutExerciseController {
  constructor(private service: WorkoutExerciseService) {}

  @Post()
  create(@Body() dto: CreateWorkoutExerciseDto) {
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
  update(@Param("id") id: string, @Body() dto: UpdateWorkoutExerciseDto) {
    return this.service.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
