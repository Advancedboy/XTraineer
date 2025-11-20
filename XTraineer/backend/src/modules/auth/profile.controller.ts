import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "./roles.decorator";
import { JwtAuthGuard } from "./jwt.guard";
import { RolesGuard } from "./roles.guard";
import { UserProfile } from "@prisma/client";

@Controller("profile")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProfileController {
  @Get()
  @Roles(Role.USER, Role.ADMIN)
  getProfile(@Req() req) {
    return req.user;
  }
}
