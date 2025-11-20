import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { CompletedWorkoutService } from "./completed-workout.service";
import { CreateCompletedWorkoutDto } from "./dto/create-completed-workout.dto";
import { UpdateCompletedWorkoutDto } from "./dto/update-completed-workout.dto";

@Controller("completed-workouts")
export class CompletedWorkoutController {
  constructor(private service: CompletedWorkoutService) {}

  @Post()
  create(@Body() dto: CreateCompletedWorkoutDto) {
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
  update(@Param("id") id: string, @Body() dto: UpdateCompletedWorkoutDto) {
    return this.service.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
