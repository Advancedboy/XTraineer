import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateWorkoutResultDto } from "./dto/create-workout-result.dto";
import { UpdateWorkoutResultDto } from "./dto/update-workout-result.dto";

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateWorkoutResultDto) {
    return this.prisma.workoutResult.create({ data: dto });
  }

  async findAllByUser(userId: number) {
    return this.prisma.workoutResult.findMany({
      where: { completedWorkout: { userId } },
      include: { exercise: true, completedWorkout: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.workoutResult.findUnique({
      where: { id },
      include: { exercise: true, completedWorkout: true },
    });
  }

  async update(id: number, dto: UpdateWorkoutResultDto) {
    return this.prisma.workoutResult.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    return this.prisma.workoutResult.delete({ where: { id } });
  }
}
