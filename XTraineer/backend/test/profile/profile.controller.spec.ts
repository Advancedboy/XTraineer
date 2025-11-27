import { Test, TestingModule } from "@nestjs/testing";
import { ProfileController } from "../../src/modules/profile/profile.controller";
import { ProfileService } from "../../src/modules/profile/profile.service";

describe("ProfileController", () => {
  let controller: ProfileController;
  let service: ProfileService;

  const serviceMock = {
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const reqMock = { user: { id: 1 } };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [{ provide: ProfileService, useValue: serviceMock }],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    service = module.get<ProfileService>(ProfileService);
    jest.clearAllMocks();
  });

  it("should create a profile", async () => {
    const dto = { bio: "Hello" };
    serviceMock.create.mockResolvedValue({ id: 1, bio: "Hello" });

    const result = await controller.create(reqMock as any, dto);

    expect(service.create).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual({ id: 1, bio: "Hello" });
  });

  it("should get profile", async () => {
    serviceMock.findOne.mockResolvedValue({ userId: 1, bio: "Test" });

    const result = await controller.get(reqMock as any);

    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual({ userId: 1, bio: "Test" });
  });

  it("should update profile", async () => {
    const dto = { bio: "Updated" };
    serviceMock.update.mockResolvedValue({ userId: 1, bio: "Updated" });

    const result = await controller.update(reqMock as any, dto);

    expect(service.update).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual({ userId: 1, bio: "Updated" });
  });

  it("should remove profile", async () => {
    serviceMock.remove.mockResolvedValue({ userId: 1 });

    const result = await controller.remove(reqMock as any);

    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual({ userId: 1 });
  });
});
