import { Module } from "@nestjs/common";
import { RecommendationService } from "./recommendation.service";
import { RecommendationController } from "./recommendation.controller";
import { PrismaService } from "../../prisma/prisma.service";

@Module({
  controllers: [RecommendationController],
  providers: [RecommendationService, PrismaService],
  exports: [RecommendationService],
})
export class RecommendationModule {}
