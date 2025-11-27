import { Test, TestingModule } from "@nestjs/testing";
import { WorkoutExerciseService } from "../../src/modules/workout-exercise/workout-exercise.service";
import { PrismaService } from "../../src/prisma/prisma.service";

describe("WorkoutExerciseService", () => {
  let service: WorkoutExerciseService;

  const mockPrisma = {
    workoutExercise: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutExerciseService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<WorkoutExerciseService>(WorkoutExerciseService);

    jest.clearAllMocks();
  });

  it("should create workout exercise", async () => {
    const dto = {
      name: "Bench Press",
      planId: 10,
      sets: 3,
      reps: 10,
    };

    mockPrisma.workoutExercise.create.mockResolvedValue({
      id: 1,
      ...dto,
    });

    const result = await service.create(dto);

    expect(result.id).toBe(1);
    expect(mockPrisma.workoutExercise.create).toHaveBeenCalledWith({
      data: {
        name: "Bench Press",
        sets: 3,
        reps: 10,
        plan: { connect: { id: 10 } },
      },
    });
  });

  it("should return all workout exercises", async () => {
    mockPrisma.workoutExercise.findMany.mockResolvedValue([{ id: 1 }]);

    const result = await service.findAll();
    expect(result).toHaveLength(1);
  });

  it("should return one workout exercise", async () => {
    mockPrisma.workoutExercise.findUnique.mockResolvedValue({ id: 1 });

    const result = await service.findOne(1);
    expect(result.id).toBe(1);
  });

  it("should update workout exercise", async () => {
    mockPrisma.workoutExercise.update.mockResolvedValue({
      id: 1,
      name: "Updated",
    });

    const result = await service.update(1, { name: "Updated" });
    expect(result.name).toBe("Updated");
  });

  it("should delete workout exercise", async () => {
    mockPrisma.workoutExercise.delete.mockResolvedValue({ id: 1 });

    const result = await service.remove(1);
    expect(result.id).toBe(1);
  });
});
