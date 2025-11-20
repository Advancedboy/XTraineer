import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateWorkoutExerciseDto } from "./dto/create-workout-exercise.dto";
import { UpdateWorkoutExerciseDto } from "./dto/update-workout-exercise.dto";

@Injectable()
export class WorkoutExerciseService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateWorkoutExerciseDto) {
    const { planId, ...rest } = dto;
    return this.prisma.workoutExercise.create({
      data: { ...rest, plan: { connect: { id: planId } } },
    });
  }

  findAll() {
    return this.prisma.workoutExercise.findMany();
  }

  findOne(id: number) {
    return this.prisma.workoutExercise.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateWorkoutExerciseDto) {
    return this.prisma.workoutExercise.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.workoutExercise.delete({ where: { id } });
  }
}
