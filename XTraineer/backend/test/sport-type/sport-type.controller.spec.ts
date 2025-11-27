import { Test, TestingModule } from "@nestjs/testing";
import { SportTypeController } from "../../src/modules/sport-type/sport-type.controller";
import { SportTypeService } from "../../src/modules/sport-type/sport-type.service";

describe("SportTypeController", () => {
  let controller: SportTypeController;
  let service: SportTypeService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SportTypeController],
      providers: [{ provide: SportTypeService, useValue: mockService }],
    }).compile();

    controller = module.get<SportTypeController>(SportTypeController);
    service = module.get<SportTypeService>(SportTypeService);
    jest.clearAllMocks();
  });

  it("should create sport type", async () => {
    const dto = { key: "running", name: "RUNNING" };
    mockService.create.mockResolvedValue({ id: 1, ...dto });

    const result = await controller.create(dto);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result.id).toBe(1);
  });

  it("should get all sport types", async () => {
    mockService.findAll.mockResolvedValue([{ id: 1 }]);

    const result = await controller.findAll();

    expect(result.length).toBe(1);
  });

  it("should get one sport type", async () => {
    mockService.findOne.mockResolvedValue({ id: 1 });

    const result = await controller.findOne("1");

    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result.id).toBe(1);
  });

  it("should update sport type", async () => {
    mockService.update.mockResolvedValue({ id: 1, name: "NEW" });

    const result = await controller.update("1", { name: "NEW" });

    expect(service.update).toHaveBeenCalledWith(1, { name: "NEW" });
    expect(result.name).toBe("NEW");
  });

  it("should delete sport type", async () => {
    mockService.remove.mockResolvedValue({ id: 1 });

    const result = await controller.remove("1");

    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result.id).toBe(1);
  });
});
