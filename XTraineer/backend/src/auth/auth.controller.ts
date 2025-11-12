import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard"; // Можно создать для логина
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Request() req) {
    const user = await this.authService.validateUser(
      req.body.email,
      req.body.password
    );
    if (!user) {
      return { statusCode: 401, message: "Invalid credentials" };
    }
    return this.authService.login(user);
  }

  // Пример защищенного эндпоинта
  /*
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  */
}
