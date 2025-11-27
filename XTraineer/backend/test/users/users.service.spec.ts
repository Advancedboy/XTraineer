import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "../../src/modules/user/user.service";
import { PrismaService } from "../../src/prisma/prisma.service";
import * as bcrypt from "bcrypt";

describe("UserService", () => {
  let service: UserService;

  const mockPrisma = {
    user: {
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
        UserService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it("should create a user", async () => {
    const dto = {
      email: "test@test.com",
      password: "123456",
      name: "John",
      age: 25,
      height: 180,
      weight: 75,
      gender: "M",
    };
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    mockPrisma.user.create.mockResolvedValue({
      ...dto,
      password: hashedPassword,
      id: 1,
    });

    const result = await service.create(dto);
    expect(mockPrisma.user.create).toHaveBeenCalled();
    expect(result).toHaveProperty("id");
    expect(result.password).toBeUndefined();
  });

  it("should return all users", async () => {
    mockPrisma.user.findMany.mockResolvedValue([
      {
        id: 1,
        email: "a@a.com",
        name: "A",
        age: 20,
        height: 170,
        weight: 70,
        gender: "M",
        createdAt: new Date(),
      },
    ]);
    const users = await service.findAll();
    expect(users.length).toBeGreaterThan(0);
  });

  it("should find one user by id", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({
      id: 1,
      email: "a@a.com",
      name: "A",
      age: 20,
      height: 170,
      weight: 70,
      gender: "M",
      createdAt: new Date(),
    });
    const user = await service.findOne(1);
    expect(user).toHaveProperty("id", 1);
  });
});
