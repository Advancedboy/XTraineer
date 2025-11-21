import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { CompletedWorkoutService } from "./completed-workout.service";
import { CreateCompletedWorkoutDto } from "./dto/create-completed-workout.dto";
import { UpdateCompletedWorkoutDto } from "./dto/update-completed-workout.dto";

@Controller("completed-workout")
@UseGuards(JwtAuthGuard)
export class CompletedWorkoutController {
  constructor(private service: CompletedWorkoutService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateCompletedWorkoutDto) {
    return this.service.create(req.user.id, dto);
  }
  @Get()
  findAll(@Req() req) {
    return this.service.findAll(req.user.id);
  }

  @Get(":id")
  findOne(@Req() req, @Param("id") id: string) {
    return this.service.findOne(+id, req.user.id);
  }

  @Patch(":id")
  update(
    @Req() req,
    @Param("id") id: string,
    @Body() dto: UpdateCompletedWorkoutDto
  ) {
    return this.service.update(+id, req.user.id, dto);
  }

  @Delete(":id")
  remove(@Req() req, @Param("id") id: string) {
    return this.service.remove(+id, req.user.id);
  }
}
