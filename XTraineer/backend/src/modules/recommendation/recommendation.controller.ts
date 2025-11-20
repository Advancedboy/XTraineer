import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { RecommendationService } from "./recommendation.service";
import { CreateRecommendationDto } from "./dto/create-recommendation.dto";
import { UpdateRecommendationDto } from "./dto/update-recommendation.dto";

@Controller("recommendations")
export class RecommendationController {
  constructor(private service: RecommendationService) {}

  @Post()
  create(@Body() dto: CreateRecommendationDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get("user/:userId")
  findAllForUser(@Param("userId") userId: string) {
    return this.service.findAllForUser(+userId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateRecommendationDto) {
    return this.service.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
