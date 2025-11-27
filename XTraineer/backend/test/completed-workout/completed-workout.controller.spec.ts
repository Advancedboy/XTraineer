import { Test, TestingModule } from "@nestjs/testing";
import { CompletedWorkoutController } from "../../src/modules/completed-workout/completed-workout.controller";
import { CompletedWorkoutService } from "../../src/modules/completed-workout/completed-workout.service";
import { JwtAuthGuard } from "../../src/modules/auth/jwt.guard";

describe("CompletedWorkoutController", () => {
  let controller: CompletedWorkoutController;
  let service: CompletedWorkoutService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockGuard = {
    canActivate: jest.fn(() => true), // всегда пропускает
  };

  const mockReq = {
    user: { id: 10 },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompletedWorkoutController],
      providers: [{ provide: CompletedWorkoutService, useValue: mockService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockGuard)
      .compile();

    controller = module.get<CompletedWorkoutController>(
      CompletedWorkoutController
    );
    service = module.get<CompletedWorkoutService>(CompletedWorkoutService);

    jest.clearAllMocks();
  });

  it("should create completed workout", async () => {
    const dto = { notes: "test" };
    mockService.create.mockResolvedValue({ id: 1 });

    const result = await controller.create(mockReq, dto);

    expect(service.create).toHaveBeenCalledWith(10, dto);
    expect(result.id).toBe(1);
  });

  it("should return all completed workouts for user", async () => {
    mockService.findAll.mockResolvedValue([{ id: 1 }]);

    const result = await controller.findAll(mockReq);

    expect(service.findAll).toHaveBeenCalledWith(10);
    expect(result.length).toBe(1);
  });

  it("should return one completed workout", async () => {
    mockService.findOne.mockResolvedValue({ id: 1 });

    const result = await controller.findOne(mockReq, "1");

    expect(service.findOne).toHaveBeenCalledWith(1, 10);
    expect(result.id).toBe(1);
  });

  it("should update completed workout", async () => {
    const dto = { notes: "updated" };
    mockService.update.mockResolvedValue({ id: 1, notes: "updated" });

    const result = await controller.update(mockReq, "1", dto);

    expect(service.update).toHaveBeenCalledWith(1, 10, dto);
    expect(result.notes).toBe("updated");
  });

  it("should remove completed workout", async () => {
    mockService.remove.mockResolvedValue({ id: 1 });

    const result = await controller.remove(mockReq, "1");

    expect(service.remove).toHaveBeenCalledWith(1, 10);
    expect(result.id).toBe(1);
  });
});
