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
import { HistoryService } from "./history.service";
import { CreateCompletedWorkoutDto } from "./dto/create-completed-workout.dto";
import { UpdateCompletedWorkoutDto } from "./dto/update-completed-workout.dto";
import { JwtAuthGuard } from "../../modules/auth/jwt.guard";

@Controller("history")
@UseGuards(JwtAuthGuard)
export class HistoryController {
  constructor(private service: HistoryService) {}

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
    return this.service.findOne(req.user.id, +id);
  }

  @Patch(":id")
  update(
    @Req() req,
    @Param("id") id: string,
    @Body() dto: UpdateCompletedWorkoutDto
  ) {
    return this.service.update(req.user.id, +id, dto);
  }

  @Delete(":id")
  remove(@Req() req, @Param("id") id: string) {
    return this.service.remove(req.user.id, +id);
  }
}
