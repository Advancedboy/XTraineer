import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateWorkoutResultDto } from "./dto/create-workout-result.dto";
import { UpdateWorkoutResultDto } from "./dto/update-workout-result.dto";

@Injectable()
export class WorkoutResultService {
  constructor(private prisma: PrismaService) {}

  create(completedWorkoutId: number, dto: CreateWorkoutResultDto) {
    return this.prisma.workoutResult.create({
      data: {
        ...dto,
        completedWorkout: { connect: { id: completedWorkoutId } },
      },
    });
  }

  createStandalone(dto: CreateWorkoutResultDto) {
    // if completedWorkoutId provided in dto
    if (dto.completedWorkoutId) {
      const { completedWorkoutId, ...rest } = dto as any;
      return this.prisma.workoutResult.create({
        data: {
          ...rest,
          completedWorkout: { connect: { id: completedWorkoutId } },
        },
      });
    }
    return this.prisma.workoutResult.create({ data: dto as any });
  }

  findAll() {
    return this.prisma.workoutResult.findMany();
  }

  findOne(id: number) {
    return this.prisma.workoutResult.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateWorkoutResultDto) {
    return this.prisma.workoutResult.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.workoutResult.delete({ where: { id } });
  }
}
