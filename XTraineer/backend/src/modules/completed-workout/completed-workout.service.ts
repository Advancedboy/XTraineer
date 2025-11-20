import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCompletedWorkoutDto } from "./dto/create-completed-workout.dto";
import { UpdateCompletedWorkoutDto } from "./dto/update-completed-workout.dto";

@Injectable()
export class CompletedWorkoutService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateCompletedWorkoutDto) {
    const { results, ...rest } = dto;
    return this.prisma.completedWorkout.create({
      data: {
        ...rest,
        startedAt: new Date(rest.startedAt),
        finishedAt: rest.finishedAt ? new Date(rest.finishedAt) : undefined,
        results: results && results.length ? { create: results } : undefined,
      },
      include: { results: true },
    });
  }

  findAll() {
    return this.prisma.completedWorkout.findMany({
      include: { results: true, user: true, plan: true },
    });
  }

  findOne(id: number) {
    return this.prisma.completedWorkout.findUnique({
      where: { id },
      include: { results: true, user: true, plan: true },
    });
  }

  update(id: number, dto: UpdateCompletedWorkoutDto) {
    const data: any = { ...dto };
    if (data.startedAt) data.startedAt = new Date(data.startedAt);
    if (data.finishedAt) data.finishedAt = new Date(data.finishedAt);
    // note: updating nested results is out of scope here (could be handled by WorkoutResult endpoints)
    return this.prisma.completedWorkout.update({
      where: { id },
      data,
      include: { results: true },
    });
  }

  remove(id: number) {
    return this.prisma.completedWorkout.delete({ where: { id } });
  }
}
