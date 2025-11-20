import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { RolesGuard } from "./roles.guard";
import { Roles } from "./roles.decorator";
import { Role } from "@prisma/client";

@Controller("admin")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  @Get("users")
  @Roles(Role.ADMIN)
  getAllUsers() {
    return "Только админ видит всех пользователей";
  }
}
