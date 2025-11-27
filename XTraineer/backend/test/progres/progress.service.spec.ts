import { Test, TestingModule } from "@nestjs/testing";
import { ProgressService } from "../../src/modules/progress/progress.service";
import { PrismaService } from "../../src/prisma/prisma.service";

describe("ProgressService", () => {
  let service: ProgressService;

  const mockPrisma = {
    workoutResult: {
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
        ProgressService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ProgressService>(ProgressService);
    jest.clearAllMocks();
  });

  it("should create workout progress", async () => {
    const dto = {
      exerciseId: 1,
      completedWorkoutId: 5,
      setsDone: 3,
      repsPerSet: 10,
    };

    mockPrisma.workoutResult.create.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(dto);

    expect(mockPrisma.workoutResult.create).toHaveBeenCalled();
    expect(result.id).toBe(1);
  });

  it("should throw error if exerciseId is missing", async () => {
    const dto: any = { completedWorkoutId: 5 };

    await expect(service.create(dto)).rejects.toThrow("exerciseId is required");
  });

  it("should find all progress for user", async () => {
    mockPrisma.workoutResult.findMany.mockResolvedValue([
      { id: 1, setsDone: 3 },
    ]);

    const result = await service.findAllByUser(10);

    expect(mockPrisma.workoutResult.findMany).toHaveBeenCalledWith({
      where: { completedWorkout: { userId: 10 } },
      include: { exercise: true, completedWorkout: true },
    });
    expect(result.length).toBe(1);
  });

  it("should find one progress record", async () => {
    mockPrisma.workoutResult.findUnique.mockResolvedValue({ id: 1 });

    const result = await service.findOne(1);

    expect(mockPrisma.workoutResult.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { exercise: true, completedWorkout: true },
    });
    expect(result.id).toBe(1);
  });

  it("should update progress", async () => {
    const dto = { setsDone: 10 };
    mockPrisma.workoutResult.update.mockResolvedValue({ id: 1, ...dto });

    const result = await service.update(1, dto);

    expect(mockPrisma.workoutResult.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: dto,
    });
    expect(result.setsDone).toBe(10);
  });

  it("should remove progress", async () => {
    mockPrisma.workoutResult.delete.mockResolvedValue({ id: 1 });

    const result = await service.remove(1);

    expect(mockPrisma.workoutResult.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result.id).toBe(1);
  });
});
