import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "../../src/modules/auth/auth.controller";
import { AuthService } from "../../src/modules/auth/auth.service";

describe("AuthController", () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it("should call register", async () => {
    const dto = {
      email: "test@test.com",
      password: "password123",
      name: "Test",
      age: 25,
      height: 180,
      weight: 75,
    };
    (authService.register as jest.Mock).mockResolvedValue("result");

    const result = await controller.register(dto as any);
    expect(result).toBe("result");
    expect(authService.register).toHaveBeenCalledWith(dto);
  });

  it("should call login", async () => {
    const dto = { email: "test@test.com", password: "password123" };
    (authService.login as jest.Mock).mockResolvedValue("result");

    const result = await controller.login(dto as any);
    expect(result).toBe("result");
    expect(authService.login).toHaveBeenCalledWith(dto);
  });

  it("should return user from me endpoint", async () => {
    const req = { user: { id: 1, email: "test@test.com" } };
    const result = controller.me(req as any);
    expect(result).toEqual(req.user);
  });
});
