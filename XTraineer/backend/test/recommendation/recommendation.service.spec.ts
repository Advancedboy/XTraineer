import { Test, TestingModule } from "@nestjs/testing";
import { RecommendationService } from "../../src/modules/recommendation/recommendation.service";
import { PrismaService } from "../../src/prisma/prisma.service";

describe("RecommendationService", () => {
  let service: RecommendationService;
  let prisma: PrismaService;

  const prismaMock = {
    recommendation: {
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
        RecommendationService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<RecommendationService>(RecommendationService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  it("should create recommendation", async () => {
    const dto = { userId: 1, content: "Test" };
    prismaMock.recommendation.create.mockResolvedValue(dto);

    const result = await service.create(dto);

    expect(prisma.recommendation.create).toHaveBeenCalledWith({ data: dto });
    expect(result).toEqual(dto);
  });

  it("should find all recommendations for user", async () => {
    const data = [{ id: 1 }];
    prismaMock.recommendation.findMany.mockResolvedValue(data);

    const result = await service.findAllForUser(1);

    expect(prisma.recommendation.findMany).toHaveBeenCalledWith({
      where: { userId: 1 },
      orderBy: { createdAt: "desc" },
    });
    expect(result).toEqual(data);
  });

  it("should find all recommendations", async () => {
    const data = [{ id: 1 }];
    prismaMock.recommendation.findMany.mockResolvedValue(data);

    expect(await service.findAll()).toEqual(data);
  });

  it("should find one recommendation", async () => {
    const item = { id: 1 };
    prismaMock.recommendation.findUnique.mockResolvedValue(item);

    expect(await service.findOne(1)).toEqual(item);
  });

  it("should update recommendation", async () => {
    const dto = { content: "updated" };
    prismaMock.recommendation.update.mockResolvedValue({
      id: 1,
      ...dto,
    });

    const result = await service.update(1, dto);

    expect(prisma.recommendation.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: dto,
    });
    expect(result).toEqual({ id: 1, ...dto });
  });

  it("should delete recommendation", async () => {
    prismaMock.recommendation.delete.mockResolvedValue({ id: 1 });

    expect(await service.remove(1)).toEqual({ id: 1 });
  });
});
