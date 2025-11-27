import { Test, TestingModule } from "@nestjs/testing";
import { WorkoutResultController } from "../../src/modules/workout-result/workout-result.controller";
import { WorkoutResultService } from "../../src/modules/workout-result/workout-result.service";

describe("WorkoutResultController", () => {
  let controller: WorkoutResultController;
  let service: WorkoutResultService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutResultController],
      providers: [{ provide: WorkoutResultService, useValue: mockService }],
    }).compile();

    controller = module.get<WorkoutResultController>(WorkoutResultController);
    service = module.get<WorkoutResultService>(WorkoutResultService);

    jest.clearAllMocks();
  });

  it("should create workout result", async () => {
    const dto = { exerciseId: 1, completedWorkoutId: 2 };
    mockService.create.mockResolvedValue({ id: 1 });

    const result = await controller.create(dto);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ id: 1 });
  });

  it("should find all results", async () => {
    mockService.findAll.mockResolvedValue([{}]);

    const result = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([{}]);
  });

  it("should find one result", async () => {
    mockService.findOne.mockResolvedValue({ id: 1 });

    const result = await controller.findOne("1");

    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual({ id: 1 });
  });

  it("should update a result", async () => {
    const dto = { setsDone: 5 };
    mockService.update.mockResolvedValue({ id: 1 });

    const result = await controller.update("1", dto);

    expect(service.update).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual({ id: 1 });
  });

  it("should delete a result", async () => {
    mockService.remove.mockResolvedValue({ id: 1 });

    const result = await controller.remove("1");

    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual({ id: 1 });
  });
});
