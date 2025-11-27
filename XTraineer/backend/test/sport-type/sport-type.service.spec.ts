import { Test, TestingModule } from "@nestjs/testing";
import { SportTypeService } from "../../src/modules/sport-type/sport-type.service";
import { PrismaService } from "../../src/prisma/prisma.service";

describe("SportTypeService", () => {
  let service: SportTypeService;

  const mockPrisma = {
    sportType: {
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
        SportTypeService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<SportTypeService>(SportTypeService);
    jest.clearAllMocks();
  });

  it("should create sport type", async () => {
    const dto = { key: "running", name: "RUNNING", description: "desc" };

    mockPrisma.sportType.create.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(dto);

    expect(mockPrisma.sportType.create).toHaveBeenCalledWith({
      data: dto,
    });

    expect(result.id).toBe(1);
  });

  it("should find all sport types", async () => {
    mockPrisma.sportType.findMany.mockResolvedValue([{ id: 1 }]);

    const result = await service.findAll();

    expect(mockPrisma.sportType.findMany).toHaveBeenCalledWith({
      include: { workoutPlans: true },
    });

    expect(result.length).toBe(1);
  });

  it("should find one sport type", async () => {
    mockPrisma.sportType.findUnique.mockResolvedValue({ id: 1 });

    const result = await service.findOne(1);

    expect(mockPrisma.sportType.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { workoutPlans: true },
    });

    expect(result.id).toBe(1);
  });

  it("should update sport type", async () => {
    mockPrisma.sportType.update.mockResolvedValue({ id: 1, name: "NEW" });

    const result = await service.update(1, { name: "NEW" });

    expect(mockPrisma.sportType.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { name: "NEW" },
    });

    expect(result.name).toBe("NEW");
  });

  it("should delete sport type", async () => {
    mockPrisma.sportType.delete.mockResolvedValue({ id: 1 });

    const result = await service.remove(1);

    expect(mockPrisma.sportType.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(result.id).toBe(1);
  });
});
