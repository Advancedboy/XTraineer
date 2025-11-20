import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || "SECRET_KEY",
    });
  }
  async validate(payload: any) {
    const user = await this.authService.validateUser(payload);
    if (!user) throw new UnauthorizedException();
    return user; // user.role уже будет в req.user
  }
}
