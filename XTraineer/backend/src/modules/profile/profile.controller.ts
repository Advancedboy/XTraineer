import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  UseGuards,
  Req,
} from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { JwtAuthGuard } from "../auth/jwt.guard";

@Controller("profiles")
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private service: ProfileService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateProfileDto) {
    return this.service.create(req.user.id, dto);
  }

  @Get()
  get(@Req() req) {
    return this.service.findOne(req.user.id);
  }

  @Patch()
  update(@Req() req, @Body() dto: UpdateProfileDto) {
    return this.service.update(req.user.id, dto);
  }

  @Delete()
  remove(@Req() req) {
    return this.service.remove(req.user.id);
  }
}
