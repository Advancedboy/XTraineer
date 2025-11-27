import { Test, TestingModule } from "@nestjs/testing";
import { WorkoutResultService } from "../../src/modules/workout-result/workout-result.service";
import { PrismaService } from "../../src/prisma/prisma.service";
import { NotFoundException } from "@nestjs/common";

describe("WorkoutResultService", () => {
  let service: WorkoutResultService;
  let prisma: PrismaService;

  const prismaMock = {
    workoutResult: {
      create: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutResultService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<WorkoutResultService>(WorkoutResultService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  // --------------------------------------
  // CREATE
  // --------------------------------------
  it("should create workout result", async () => {
    const dto = {
      exerciseId: 10,
      completedWorkoutId: 5,
      setsDone: 3,
      repsPerSet: 12,
      weightKg: 50,
      durationSec: 200,
      notes: "test",
    };

    const mockResult = { id: 1, ...dto };
    prisma.workoutResult.create.mockResolvedValue(mockResult);

    const result = await service.create(dto);

    expect(prisma.workoutResult.create).toHaveBeenCalledWith({
      data: {
        exercise: { connect: { id: 10 } },
        completedWorkout: { connect: { id: 5 } },
        sets: 3,
        reps: 12,
        weight: 50,
        duration: 200,
        notesText: "test",
      },
      include: { exercise: true, completedWorkout: true },
    });

    expect(result).toEqual(mockResult);
  });

  // --------------------------------------
  // UPDATE - NOT FOUND
  // --------------------------------------
  it("should throw NotFoundException on update when record does not exist", async () => {
    prisma.workoutResult.findUnique.mockResolvedValue(null);

    await expect(service.update(1, {})).rejects.toThrow(NotFoundException);
  });

  // --------------------------------------
  // UPDATE - SUCCESS
  // --------------------------------------
  it("should update workout result", async () => {
    prisma.workoutResult.findUnique.mockResolvedValue({ id: 1 });

    prisma.workoutResult.update.mockResolvedValue({
      id: 1,
      sets: 10,
    });

    const dto = {
      setsDone: 10,
      completedWorkoutId: 0, // disconnect
    };

    const result = await service.update(1, dto);

    expect(prisma.workoutResult.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        sets: 10,
        completedWorkout: { disconnect: true },
      },
      include: { exercise: true, completedWorkout: true },
    });

    expect(result).toEqual({ id: 1, sets: 10 });
  });

  // --------------------------------------
  // FIND ALL
  // --------------------------------------
  it("should find all workout results", async () => {
    const mock = [{ id: 1 }, { id: 2 }];
    prisma.workoutResult.findMany.mockResolvedValue(mock);

    const result = await service.findAll();

    expect(prisma.workoutResult.findMany).toHaveBeenCalledWith({
      include: { exercise: true, completedWorkout: true },
    });

    expect(result).toEqual(mock);
  });

  // --------------------------------------
  // FIND ONE - NOT FOUND
  // --------------------------------------
  it("should throw NotFoundException on findOne when not found", async () => {
    prisma.workoutResult.findUnique.mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  // --------------------------------------
  // FIND ONE - SUCCESS
  // --------------------------------------
  it("should find one workout result", async () => {
    prisma.workoutResult.findUnique.mockResolvedValue({ id: 1 });

    const result = await service.findOne(1);

    expect(prisma.workoutResult.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { exercise: true, completedWorkout: true },
    });

    expect(result).toEqual({ id: 1 });
  });

  // --------------------------------------
  // DELETE - NOT FOUND
  // --------------------------------------
  it("should throw NotFoundException when deleting non-existing record", async () => {
    prisma.workoutResult.findUnique.mockResolvedValue(null);

    await expect(service.remove(1)).rejects.toThrow(NotFoundException);
  });

  // --------------------------------------
  // DELETE - SUCCESS
  // --------------------------------------
  it("should delete workout result", async () => {
    prisma.workoutResult.findUnique.mockResolvedValue({ id: 1 });
    prisma.workoutResult.delete.mockResolvedValue({ id: 1 });

    const result = await service.remove(1);

    expect(prisma.workoutResult.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(result).toEqual({ id: 1 });
  });
});
