import { Test, TestingModule } from "@nestjs/testing";
import { WorkoutPlanService } from "../../src/modules/workout-plan/workout-plan.service";
import { PrismaService } from "../../src/prisma/prisma.service";

describe("WorkoutPlanService", () => {
  let service: WorkoutPlanService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutPlanService,
        {
          provide: PrismaService,
          useValue: {
            workoutPlan: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<WorkoutPlanService>(WorkoutPlanService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it("should create a workout plan", async () => {
    const dto = {
      title: "Plan A",
      description: "desc",
      isPublic: true,
      ownerId: 1,
      sportTypeId: 2,
    };

    prisma.workoutPlan.create.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(dto);

    expect(result).toHaveProperty("id");
  });
});
