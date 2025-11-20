import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRecommendationDto } from "./dto/create-recommendation.dto";
import { UpdateRecommendationDto } from "./dto/update-recommendation.dto";

@Injectable()
export class RecommendationService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateRecommendationDto) {
    return this.prisma.recommendation.create({ data: dto });
  }

  findAllForUser(userId: number) {
    return this.prisma.recommendation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  findAll() {
    return this.prisma.recommendation.findMany();
  }

  findOne(id: number) {
    return this.prisma.recommendation.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateRecommendationDto) {
    return this.prisma.recommendation.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.recommendation.delete({ where: { id } });
  }
}
