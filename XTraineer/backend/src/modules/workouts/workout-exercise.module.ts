import { Module } from "@nestjs/common";
import { WorkoutExerciseService } from "./workout-exercise.service";
import { WorkoutExerciseController } from "./workout-exercise.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [WorkoutExerciseController],
  providers: [WorkoutExerciseService, PrismaService],
  exports: [WorkoutExerciseService],
})
export class WorkoutExerciseModule {}
