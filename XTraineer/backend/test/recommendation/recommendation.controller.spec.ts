import { Test, TestingModule } from "@nestjs/testing";
import { RecommendationController } from "../../src/modules/recommendation/recommendation.controller";
import { RecommendationService } from "../../src/modules/recommendation/recommendation.service";

describe("RecommendationController", () => {
  let controller: RecommendationController;
  let service: RecommendationService;

  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findAllForUser: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecommendationController],
      providers: [{ provide: RecommendationService, useValue: serviceMock }],
    }).compile();

    controller = module.get<RecommendationController>(RecommendationController);
    service = module.get<RecommendationService>(RecommendationService);
    jest.clearAllMocks();
  });

  it("should create recommendation", async () => {
    const dto = { userId: 1, content: "abc" };
    serviceMock.create.mockResolvedValue(dto);

    expect(await controller.create(dto)).toBe(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it("should find all", async () => {
    const data = [{ id: 1 }];
    serviceMock.findAll.mockResolvedValue(data);

    expect(await controller.findAll()).toBe(data);
  });

  it("should find all for user", async () => {
    const data = [{ id: 1 }];
    serviceMock.findAllForUser.mockResolvedValue(data);

    expect(await controller.findAllForUser("5")).toBe(data);
    expect(service.findAllForUser).toHaveBeenCalledWith(5);
  });

  it("should find one", async () => {
    const item = { id: 1 };
    serviceMock.findOne.mockResolvedValue(item);

    expect(await controller.findOne("1")).toBe(item);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it("should update", async () => {
    const updated = { id: 1, content: "upd" };
    serviceMock.update.mockResolvedValue(updated);

    expect(await controller.update("1", { content: "upd" })).toBe(updated);
    expect(service.update).toHaveBeenCalledWith(1, { content: "upd" });
  });

  it("should delete", async () => {
    const removed = { id: 1 };
    serviceMock.remove.mockResolvedValue(removed);

    expect(await controller.remove("1")).toBe(removed);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
