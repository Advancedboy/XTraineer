import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../../src/auth/auth.service";
import { UsersService } from "../../src/users/users.service";

describe("AuthService", () => {
  let authService: AuthService;
  let usersService: Partial<UsersService>;

  beforeEach(async () => {
    usersService = {
      validateUser: jest
        .fn()
        .mockResolvedValue({ id: 1, email: "test@example.com" }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it("validateUser should return user if valid", async () => {
    const user = await authService.validateUser("test@example.com", "password");
    expect(user).toEqual({ id: 1, email: "test@example.com" });
  });

  // Дополнительные тесты на случай невалидного пользователя можно добавить
});
