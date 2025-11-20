import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { SportTypeService } from "./sport-type.service";
import { CreateSportTypeDto } from "./dto/create-sport-type.dto";
import { UpdateSportTypeDto } from "./dto/update-sport-type.dto";

@Controller("sport-types")
export class SportTypeController {
  constructor(private service: SportTypeService) {}

  @Post()
  create(@Body() dto: CreateSportTypeDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateSportTypeDto) {
    return this.service.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
