import { Test, TestingModule } from "@nestjs/testing";
import { WorkoutExerciseController } from "../../src/modules/workout-exercise/workout-exercise.controller";
import { WorkoutExerciseService } from "../../src/modules/workout-exercise/workout-exercise.service";

describe("WorkoutExerciseController", () => {
  let controller: WorkoutExerciseController;
  let service: WorkoutExerciseService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutExerciseController],
      providers: [{ provide: WorkoutExerciseService, useValue: mockService }],
    }).compile();

    controller = module.get<WorkoutExerciseController>(
      WorkoutExerciseController
    );
    service = module.get<WorkoutExerciseService>(WorkoutExerciseService);

    jest.clearAllMocks();
  });

  it("should create workout exercise", async () => {
    const dto = { name: "Bench", planId: 1 };
    mockService.create.mockResolvedValue({ id: 1, ...dto });

    const result = await controller.create(dto);

    expect(result.id).toBe(1);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it("should get all workout exercises", async () => {
    mockService.findAll.mockResolvedValue([{ id: 1 }]);

    const result = await controller.findAll();

    expect(result).toHaveLength(1);
  });

  it("should get one", async () => {
    mockService.findOne.mockResolvedValue({ id: 1 });

    const result = await controller.findOne("1");

    expect(result.id).toBe(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it("should update", async () => {
    mockService.update.mockResolvedValue({ id: 1, name: "Updated" });

    const result = await controller.update("1", { name: "Updated" });

    expect(result.name).toBe("Updated");
    expect(service.update).toHaveBeenCalledWith(1, { name: "Updated" });
  });

  it("should delete", async () => {
    mockService.remove.mockResolvedValue({ id: 1 });

    const result = await controller.remove("1");

    expect(result.id).toBe(1);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
