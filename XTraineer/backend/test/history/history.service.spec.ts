import { Test, TestingModule } from "@nestjs/testing";
import { HistoryService } from "../../src/modules/history/history.service";
import { PrismaService } from "../../src/prisma/prisma.service";
import { NotFoundException } from "@nestjs/common";

describe("HistoryService", () => {
  let service: HistoryService;
  let prisma: PrismaService;

  const prismaMock = {
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
        HistoryService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<HistoryService>(HistoryService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  // -----------------------------
  // CREATE
  // -----------------------------
  it("should create a completed workout", async () => {
    const dto = {
      userId: 1,
      startedAt: "2024-01-01",
      planId: 5,
      results: [{ exerciseId: 10, setsDone: 3, repsPerSet: 10 }],
    };

    prismaMock.completedWorkout.create.mockResolvedValue({ id: 100 });

    const result = await service.create(dto);

    expect(prisma.completedWorkout.create).toHaveBeenCalledWith({
      data: {
        user: { connect: { id: 1 } },
        startedAt: "2024-01-01",
        finishedAt: null,
        notes: null,
        plan: { connect: { id: 5 } },
        results: {
          create: [
            {
              exercise: { connect: { id: 10 } },
              setsDone: 3,
              repsPerSet: 10,
              weightKg: null,
              durationSec: null,
              notes: null,
            },
          ],
        },
      },
      include: { results: true, plan: true },
    });

    expect(result).toEqual({ id: 100 });
  });

  // -----------------------------
  // FIND ALL
  // -----------------------------
  it("should find all workouts for user", async () => {
    const data = [{ id: 1 }];
    prismaMock.completedWorkout.findMany.mockResolvedValue(data);

    const result = await service.findAll(1);

    expect(prisma.completedWorkout.findMany).toHaveBeenCalledWith({
      where: { userId: 1 },
      include: { results: true, plan: true },
    });

    expect(result).toEqual(data);
  });

  // -----------------------------
  // FIND ONE
  // -----------------------------
  it("should find one workout", async () => {
    prismaMock.completedWorkout.findFirst.mockResolvedValue({ id: 1 });

    const result = await service.findOne(2, 1);

    expect(prisma.completedWorkout.findFirst).toHaveBeenCalledWith({
      where: { id: 1, userId: 2 },
      include: { results: true, plan: true },
    });
    expect(result).toEqual({ id: 1 });
  });

  it("should throw NotFoundException if workout not found", async () => {
    prismaMock.completedWorkout.findFirst.mockResolvedValue(null);

    await expect(service.findOne(1, 99)).rejects.toThrow(NotFoundException);
  });

  // -----------------------------
  // UPDATE
  // -----------------------------
  it("should update workout", async () => {
    prismaMock.completedWorkout.update.mockResolvedValue({ id: 1 });

    const dto = { notes: "updated", planId: 10 };

    const result = await service.update(1, 1, dto);

    expect(prisma.completedWorkout.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        notes: "updated",
        plan: { connect: { id: 10 } },
      },
    });

    expect(result).toEqual({ id: 1 });
  });

  // -----------------------------
  // DELETE
  // -----------------------------
  it("should delete workout", async () => {
    prismaMock.completedWorkout.findFirst.mockResolvedValue({ id: 1 });
    prismaMock.completedWorkout.delete.mockResolvedValue({ id: 1 });

    const result = await service.remove(5, 1);

    expect(prisma.completedWorkout.findFirst).toHaveBeenCalledWith({
      where: { id: 1, userId: 5 },
    });

    expect(prisma.completedWorkout.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(result).toEqual({ id: 1 });
  });

  it("should throw NotFoundException on delete if not found", async () => {
    prismaMock.completedWorkout.findFirst.mockResolvedValue(null);

    await expect(service.remove(1, 123)).rejects.toThrow(NotFoundException);
  });
});
