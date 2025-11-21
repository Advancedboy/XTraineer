import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../../modules/auth/jwt.guard";
import { WorkoutResultService } from "./workout-result.service";
import { CreateWorkoutResultDto } from "./dto/create-workout-result.dto";
import { UpdateWorkoutResultDto } from "./dto/update-workout-result.dto";

@Controller("workout-results")
@UseGuards(JwtAuthGuard)
export class WorkoutResultController {
  constructor(private service: WorkoutResultService) {}

  @Post()
  create(@Body() dto: CreateWorkoutResultDto) {
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
  update(@Param("id") id: string, @Body() dto: UpdateWorkoutResultDto) {
    return this.service.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
