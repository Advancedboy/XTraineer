import { Test, TestingModule } from "@nestjs/testing";
import { WorkoutPlanService } from "../../src/modules/workout-plan/workout-plan.service";
import { PrismaService } from "../../src/prisma/prisma.service";

describe("WorkoutPlanService", () => {
  let service: WorkoutPlanService;
  let prisma: PrismaService;

  const prismaMock = {
    workoutPlan: {
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
        WorkoutPlanService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<WorkoutPlanService>(WorkoutPlanService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  // CREATE
  it("should create a workout plan", async () => {
    const dto = {
      title: "Plan A",
      description: "desc",
      isPublic: true,
      ownerId: 1,
      sportTypeId: 2,
    };

    const created = { id: 1, ...dto };

    prisma.workoutPlan.create.mockResolvedValue(created);

    const result = await service.create(dto);
    expect(result).toEqual(created);
  });

  // FIND ALL
  it("should find all workout plans", async () => {
    const mock = [{ id: 1 }, { id: 2 }];
    prisma.workoutPlan.findMany.mockResolvedValue(mock);

    const result = await service.findAll();
    expect(result).toEqual(mock);

    expect(prisma.workoutPlan.findMany).toHaveBeenCalledWith({
      include: { exercises: true, sportType: true, owner: true },
    });
  });

  // FIND ONE
  it("should find one workout plan", async () => {
    const mock = { id: 1 };
    prisma.workoutPlan.findUnique.mockResolvedValue(mock);

    const result = await service.findOne(1);
    expect(result).toEqual(mock);

    expect(prisma.workoutPlan.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { exercises: true, sportType: true, owner: true },
    });
  });

  // UPDATE
  it("should update a workout plan", async () => {
    const dto = {
      title: "Updated",
      sportTypeId: 3,
    };

    const updated = { id: 1, title: "Updated" };
    prisma.workoutPlan.update.mockResolvedValue(updated);

    const result = await service.update(1, dto);

    expect(prisma.workoutPlan.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        title: "Updated",
        sportType: { connect: { id: 3 } },
      },
      include: { exercises: true, sportType: true, owner: true },
    });

    expect(result).toEqual(updated);
  });

  // DELETE
  it("should remove a workout plan", async () => {
    const deleted = { id: 1 };
    prisma.workoutPlan.delete.mockResolvedValue(deleted);

    const result = await service.remove(1);

    expect(prisma.workoutPlan.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(deleted);
  });
});
