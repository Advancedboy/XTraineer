import { Test, TestingModule } from "@nestjs/testing";
import { ProfileService } from "../../src/modules/profile/profile.service";
import { PrismaService } from "../../src/prisma/prisma.service";
import { NotFoundException } from "@nestjs/common";

describe("ProfileService", () => {
  let service: ProfileService;
  const prismaMock = {
    userProfile: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    jest.clearAllMocks();
  });

  it("should create a profile", async () => {
    const dto = { bio: "Hello" };
    prismaMock.userProfile.create.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(1, dto);

    expect(prismaMock.userProfile.create).toHaveBeenCalledWith({
      data: { userId: 1, ...dto },
    });
    expect(result).toEqual({ id: 1, bio: "Hello" });
  });

  it("should find a profile", async () => {
    const profile = { userId: 1, bio: "Test" };
    prismaMock.userProfile.findUnique.mockResolvedValue(profile);

    const result = await service.findOne(1);

    expect(prismaMock.userProfile.findUnique).toHaveBeenCalledWith({
      where: { userId: 1 },
    });
    expect(result).toEqual(profile);
  });

  it("should throw NotFoundException if profile not found", async () => {
    prismaMock.userProfile.findUnique.mockResolvedValue(null);
    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it("should update a profile", async () => {
    const dto = { bio: "Updated" };
    prismaMock.userProfile.update.mockResolvedValue({ userId: 1, ...dto });

    const result = await service.update(1, dto);

    expect(prismaMock.userProfile.update).toHaveBeenCalledWith({
      where: { userId: 1 },
      data: dto,
    });
    expect(result).toEqual({ userId: 1, bio: "Updated" });
  });

  it("should remove a profile", async () => {
    prismaMock.userProfile.delete.mockResolvedValue({ userId: 1 });

    const result = await service.remove(1);

    expect(prismaMock.userProfile.delete).toHaveBeenCalledWith({
      where: { userId: 1 },
    });
    expect(result).toEqual({ userId: 1 });
  });
});
