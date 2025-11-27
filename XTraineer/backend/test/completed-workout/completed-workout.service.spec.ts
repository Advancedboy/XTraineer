import { Test, TestingModule } from "@nestjs/testing";
import { CompletedWorkoutService } from "../../src/modules/completed-workout/completed-workout.service";
import { PrismaService } from "../../src/prisma/prisma.service";

describe("CompletedWorkoutService", () => {
  let service: CompletedWorkoutService;
  const mockPrisma = {
    completedWorkout: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompletedWorkoutService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<CompletedWorkoutService>(CompletedWorkoutService);
  });

  it("should create completed workout with results", async () => {
    const userId = 1;
    const dto = {
      startedAt: new Date().toISOString(),
      finishedAt: new Date().toISOString(),
      notes: "Test workout",
      results: [{ exerciseId: 1, setsDone: 3, repsPerSet: 10 }],
    };

    mockPrisma.completedWorkout.create.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(userId, dto);
    expect(result).toHaveProperty("id");
    expect(mockPrisma.completedWorkout.create).toHaveBeenCalled();
  });

  it("should get all completed workouts for user", async () => {
    const userId = 1;
    mockPrisma.completedWorkout.findMany.mockResolvedValue([
      { id: 1, notes: "Workout" },
    ]);
    const result = await service.findAll(userId);
    expect(result.length).toBeGreaterThan(0);
  });
});
