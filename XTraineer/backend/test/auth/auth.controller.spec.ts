import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "../../src/auth/auth.controller";
import { AuthService } from "../../src/auth/auth.service";
import { UnauthorizedException } from "@nestjs/common";

describe("AuthController", () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn((user) => ({ access_token: "token" })),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe("login", () => {
    it("should return access_token when user is valid", async () => {
      const req = { user: { email: "test@example.com", id: 1 } };
      const result = await authController.login(req);
      expect(result).toEqual({ access_token: "token" });
      expect(authService.login).toHaveBeenCalledWith(req.user);
    });

    it("should throw when user is undefined", async () => {
      const req = {};
      await expect(authController.login(req)).rejects.toThrow(
        UnauthorizedException
      );
    });
  });
});
