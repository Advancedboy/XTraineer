import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "../../src/modules/user/user.controller";
import { UserService } from "../../src/modules/user/user.service";
import { JwtAuthGuard } from "../../src/modules/auth/jwt.guard";
import { ExecutionContext } from "@nestjs/common";

describe("UserController", () => {
  let controller: UserController;
  let service: UserService;

  // Mock service
  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  // Mock guard
  const mockJwtGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtGuard)
      .compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);

    jest.clearAllMocks();
  });

  it("should allow access to private route when guard passes", () => {
    const result = controller.privateRoute();
    expect(result).toBe("Only logged user can see this!");
  });

  it("should create a user", async () => {
    const dto = { email: "a@a.com", password: "123456" };
    mockService.create.mockResolvedValue({ id: 1, ...dto });

    const result = await controller.create(dto);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result.id).toBe(1);
  });

  it("should get all users", async () => {
    mockService.findAll.mockResolvedValue([{ id: 1 }]);

    const users = await controller.findAll();
    expect(users.length).toBe(1);
  });

  it("should get one user", async () => {
    mockService.findOne.mockResolvedValue({ id: 1 });

    const user = await controller.findOne("1");
    expect(user.id).toBe(1);
  });

  it("should update user", async () => {
    mockService.update.mockResolvedValue({ id: 1, name: "Updated" });

    const updated = await controller.update("1", { name: "Updated" });
    expect(updated.name).toBe("Updated");
  });

  it("should delete user", async () => {
    mockService.remove.mockResolvedValue({ id: 1 });

    const result = await controller.remove("1");
    expect(result.id).toBe(1);
  });
});
