import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../../src/modules/auth/auth.service";
import { PrismaService } from "../../src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../../src/modules/user/user.service";
import * as bcrypt from "bcrypt";
import { ConflictException, UnauthorizedException } from "@nestjs/common";

describe("AuthService", () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwtService: JwtService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: { user: { create: jest.fn(), findUnique: jest.fn() } },
        },
        {
          provide: JwtService,
          useValue: { signAsync: jest.fn().mockResolvedValue("token") },
        },
        { provide: UserService, useValue: { findByEmail: jest.fn() } },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UserService>(UserService);
  });

  describe("register", () => {
    it("should register a new user and return token", async () => {
      (userService.findByEmail as jest.Mock).mockResolvedValue(null);
      (prisma.user.create as jest.Mock).mockResolvedValue({
        id: 1,
        email: "test@test.com",
        password: "hashed",
        role: "USER",
      });

      const result = await service.register({
        email: "test@test.com",
        password: "pass",
      } as any);

      expect(result).toHaveProperty("token", "token");
      expect(result.user.password).toBeUndefined();
    });

    it("should throw ConflictException if email exists", async () => {
      (userService.findByEmail as jest.Mock).mockResolvedValue({
        id: 1,
        email: "test@test.com",
      });

      await expect(
        service.register({ email: "test@test.com", password: "pass" } as any)
      ).rejects.toThrow(ConflictException);
    });
  });

  describe("login", () => {
    it("should login successfully and return token", async () => {
      const hashed = await bcrypt.hash("pass", 10);
      (userService.findByEmail as jest.Mock).mockResolvedValue({
        id: 1,
        email: "test@test.com",
        password: hashed,
      });

      const result = await service.login({
        email: "test@test.com",
        password: "pass",
      } as any);

      expect(result).toHaveProperty("token", "token");
      expect(result.user.password).toBeUndefined();
    });

    it("should throw UnauthorizedException if email not found", async () => {
      (userService.findByEmail as jest.Mock).mockResolvedValue(null);

      await expect(
        service.login({ email: "test@test.com", password: "pass" } as any)
      ).rejects.toThrow(UnauthorizedException);
    });

    it("should throw UnauthorizedException if password invalid", async () => {
      const hashed = await bcrypt.hash("wrongpass", 10);
      (userService.findByEmail as jest.Mock).mockResolvedValue({
        id: 1,
        email: "test@test.com",
        password: hashed,
      });

      await expect(
        service.login({ email: "test@test.com", password: "pass" } as any)
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
