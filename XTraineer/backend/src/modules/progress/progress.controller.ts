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
import { CreateWorkoutProgressDto } from "./dto/create-workout-progress.dto";
import { UpdateWorkoutProgressDto } from "./dto/update-workout-progress.dto";
import { JwtAuthGuard } from "../../modules/auth/jwt.guard";

@Controller("progress")
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(private service: ProgressService) {}

  @Post()
  create(@Body() dto: CreateWorkoutProgressDto) {
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
  update(@Param("id") id: string, @Body() dto: UpdateWorkoutProgressDto) {
    return this.service.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
