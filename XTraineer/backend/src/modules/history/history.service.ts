import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateCompletedWorkoutDto } from "./dto/create-completed-workout.dto";
import { UpdateCompletedWorkoutDto } from "./dto/update-completed-workout.dto";

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  // -----------------------------
  // CREATE COMPLETED WORKOUT
  // -----------------------------
  async create(dto: CreateCompletedWorkoutDto) {
    const data: any = {
      user: { connect: { id: dto.userId } },
      startedAt: dto.startedAt,
      finishedAt: dto.finishedAt ?? null,
      notes: dto.notes ?? null,
    };

    if (dto.planId) {
      data.plan = { connect: { id: dto.planId } };
    }

    if (dto.results && dto.results.length > 0) {
      data.results = {
        create: dto.results.map((r) => ({
          exercise: { connect: { id: r.exerciseId } },
          setsDone: r.setsDone ?? null,
          repsPerSet: r.repsPerSet ?? null,
          weightKg: r.weightKg ?? null,
          durationSec: r.durationSec ?? null,
          notes: r.notes ?? null,
        })),
      };
    }

    return this.prisma.completedWorkout.create({
      data,
      include: { results: true, plan: true },
    });
  }

  // -----------------------------
  // FIND ALL FOR USER
  // -----------------------------
  async findAll(userId: number) {
    return this.prisma.completedWorkout.findMany({
      where: { userId },
      include: { results: true, plan: true },
    });
  }

  // -----------------------------
  // FIND ONE
  // -----------------------------
  async findOne(userId: number, id: number) {
    const workout = await this.prisma.completedWorkout.findFirst({
      where: { id, userId },
      include: { results: true, plan: true },
    });

    if (!workout) throw new NotFoundException("Workout not found");
    return workout;
  }

  // -----------------------------
  // UPDATE WORKOUT
  // -----------------------------
  async update(userId: number, id: number, dto: UpdateCompletedWorkoutDto) {
    const data: any = {};

    if (dto.startedAt !== undefined) data.startedAt = dto.startedAt;
    if (dto.finishedAt !== undefined) data.finishedAt = dto.finishedAt;
    if (dto.notes !== undefined) data.notes = dto.notes;

    if (dto.planId !== undefined) {
      data.plan = dto.planId
        ? { connect: { id: dto.planId } }
        : { disconnect: true };
    }

    // Результаты обновляются отдельно через workout-result.service
    // Здесь не трогаем dto.results

    return this.prisma.completedWorkout.update({
      where: { id },
      data,
    });
  }

  // -----------------------------
  // DELETE WORKOUT
  // -----------------------------
  async remove(userId: number, id: number) {
    // Можно проверить владельца (как findOne)
    const workout = await this.prisma.completedWorkout.findFirst({
      where: { id, userId },
    });
    if (!workout) throw new NotFoundException("Workout not found");

    return this.prisma.completedWorkout.delete({
      where: { id },
    });
  }
}
