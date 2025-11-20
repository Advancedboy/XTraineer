import { Module } from "@nestjs/common";
import { WorkoutResultService } from "./workout-result.service";
import { WorkoutResultController } from "./workout-result.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [WorkoutResultController],
  providers: [WorkoutResultService, PrismaService],
  exports: [WorkoutResultService],
})
export class WorkoutResultModule {}
