import { Test, TestingModule } from "@nestjs/testing";
import { HistoryController } from "../../src/modules/history/history.controller";
import { HistoryService } from "../../src/modules/history/history.service";

describe("HistoryController", () => {
  let controller: HistoryController;
  let service: HistoryService;

  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const reqMock = { user: { id: 1 } };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryController],
      providers: [{ provide: HistoryService, useValue: serviceMock }],
    }).compile();

    controller = module.get<HistoryController>(HistoryController);
    service = module.get<HistoryService>(HistoryService);

    jest.clearAllMocks();
  });

  it("should create workout and set userId from req", async () => {
    const dto = { startedAt: "2024-01-01" };
    const expected = { id: 123 };

    serviceMock.create.mockResolvedValue(expected);

    const result = await controller.create(reqMock as any, dto as any);

    expect(dto.userId).toBe(1); // важная проверка!
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expected);
  });

  it("should find all for user", async () => {
    const data = [{ id: 1 }];
    serviceMock.findAll.mockResolvedValue(data);

    const result = await controller.findAll(reqMock as any);

    expect(service.findAll).toHaveBeenCalledWith(1);
    expect(result).toEqual(data);
  });

  it("should update workout", async () => {
    const dto = { notes: "hello" };
    const updated = { id: 1, notes: "hello" };

    serviceMock.update.mockResolvedValue(updated);

    const result = await controller.update(reqMock as any, "5", dto as any);

    expect(service.update).toHaveBeenCalledWith(1, 5, dto);
    expect(result).toEqual(updated);
  });

  it("should call remove with userId", async () => {
    serviceMock.remove.mockResolvedValue({ id: 10 });

    const result = await controller.remove(reqMock as any, "10");

    expect(result).toEqual(undefined); // remove controller returns nothing
  });
});
