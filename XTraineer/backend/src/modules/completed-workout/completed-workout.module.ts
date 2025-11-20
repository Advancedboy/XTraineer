import { Module } from "@nestjs/common";
import { CompletedWorkoutService } from "./completed-workout.service";
import { CompletedWorkoutController } from "./completed-workout.controller";
import { PrismaService } from "../../prisma/prisma.service";

@Module({
  controllers: [CompletedWorkoutController],
  providers: [CompletedWorkoutService, PrismaService],
  exports: [CompletedWorkoutService],
})
export class CompletedWorkoutModule {}
