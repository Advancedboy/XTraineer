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
import { ProgressService } from "./progress.service";
import { CreateWorkoutResultDto } from "./dto/create-workout-result.dto";
import { UpdateWorkoutResultDto } from "./dto/update-workout-result.dto";
import { JwtAuthGuard } from "../../modules/auth/jwt.guard";

@Controller("progress")
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(private service: ProgressService) {}

  @Post()
  create(@Body() dto: CreateWorkoutResultDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Req() req) {
    return this.service.findAllByUser(req.user.id);
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
