import { Module } from "@nestjs/common";
import { WorkoutPlanService } from "./workout-plan.service";
import { WorkoutPlanController } from "./workout-plan.controller";
import { PrismaService } from "../../prisma/prisma.service";

@Module({
  controllers: [WorkoutPlanController],
  providers: [WorkoutPlanService, PrismaService],
  exports: [WorkoutPlanService],
})
export class WorkoutPlanModule {}
