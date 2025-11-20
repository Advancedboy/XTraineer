import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateCompletedWorkoutDto } from "./dto/create-completed-workout.dto";
import { UpdateCompletedWorkoutDto } from "./dto/update-completed-workout.dto";

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateCompletedWorkoutDto) {
    return this.prisma.completedWorkout.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.completedWorkout.findMany({
      where: { userId },
      include: { results: true, plan: true },
    });
  }

  async findOne(userId: number, id: number) {
    const workout = await this.prisma.completedWorkout.findFirst({
      where: { id, userId },
      include: { results: true, plan: true },
    });
    if (!workout) throw new NotFoundException("Workout not found");
    return workout;
  }

  async update(userId: number, id: number, dto: UpdateCompletedWorkoutDto) {
    return this.prisma.completedWorkout.update({
      where: { id },
      data: dto,
    });
  }

  async remove(userId: number, id: number) {
    return this.prisma.completedWorkout.delete({
      where: { id },
    });
  }
}
