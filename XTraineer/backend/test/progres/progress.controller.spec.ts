import { Test, TestingModule } from "@nestjs/testing";
import { ProgressController } from "../../src/modules/progress/progress.controller";
import { ProgressService } from "../../src/modules/progress/progress.service";
import { JwtAuthGuard } from "../../src/modules/auth/jwt.guard";

describe("ProgressController", () => {
  let controller: ProgressController;
  let service: ProgressService;

  const mockService = {
    create: jest.fn(),
    findAllByUser: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockGuard = {
    canActivate: jest.fn(() => true),
  };

  const mockReq = {
    user: { id: 10 },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgressController],
      providers: [{ provide: ProgressService, useValue: mockService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockGuard)
      .compile();

    controller = module.get<ProgressController>(ProgressController);
    service = module.get<ProgressService>(ProgressService);

    jest.clearAllMocks();
  });

  it("should create progress", async () => {
    const dto = { exerciseId: 1 };
    mockService.create.mockResolvedValue({ id: 1 });

    const result = await controller.create(dto);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result.id).toBe(1);
  });

  it("should return all progress by user", async () => {
    mockService.findAllByUser.mockResolvedValue([{ id: 1 }]);

    const result = await controller.findAll(mockReq);

    expect(service.findAllByUser).toHaveBeenCalledWith(10);
    expect(result.length).toBe(1);
  });

  it("should return one progress record", async () => {
    mockService.findOne.mockResolvedValue({ id: 1 });

    const result = await controller.findOne("1");

    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result.id).toBe(1);
  });

  it("should update progress", async () => {
    const dto = { setsDone: 8 };
    mockService.update.mockResolvedValue({ id: 1, setsDone: 8 });

    const result = await controller.update("1", dto);

    expect(service.update).toHaveBeenCalledWith(1, dto);
    expect(result.setsDone).toBe(8);
  });

  it("should delete progress record", async () => {
    mockService.remove.mockResolvedValue({ id: 1 });

    const result = await controller.remove("1");

    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result.id).toBe(1);
  });
});
