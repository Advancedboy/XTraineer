import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateCompletedWorkoutDto } from "./dto/create-completed-workout.dto";
import { UpdateCompletedWorkoutDto } from "./dto/update-completed-workout.dto";

@Injectable()
export class CompletedWorkoutService {
  constructor(private prisma: PrismaService) {}

  // -----------------------------
  // CREATE
  // -----------------------------
  async create(userId: number, dto: CreateCompletedWorkoutDto) {
    return this.prisma.completedWorkout.create({
      data: {
        user: { connect: { id: userId } },
        plan: dto.planId ? { connect: { id: dto.planId } } : undefined,
        startedAt: new Date(dto.startedAt),
        finishedAt: dto.finishedAt ? new Date(dto.finishedAt) : null,
        notes: dto.notes ?? null,
        results: dto.results?.length
          ? {
              create: dto.results.map((r) => ({
                exercise: { connect: { id: r.exerciseId } },
                setsDone: r.setsDone ?? null,
                repsPerSet: r.repsPerSet ?? null,
                weightKg: r.weightKg ?? null,
                durationSec: r.durationSec ?? null,
                notes: r.notes ?? null,
              })),
            }
          : undefined,
      },
      include: { results: true, plan: true },
    });
  }

  // -----------------------------
  // GET ALL workouts for a user
  // -----------------------------
  async findAll(userId: number) {
    return this.prisma.completedWorkout.findMany({
      where: { userId },
      include: { results: true, plan: true },
    });
  }

  // -----------------------------
  // GET one workout of a user
  // -----------------------------
  async findOne(id: number, userId: number) {
    const workout = await this.prisma.completedWorkout.findFirst({
      where: { id, userId },
      include: { results: true, plan: true },
    });
    if (!workout) throw new NotFoundException("Completed workout not found");
    return workout;
  }

  // -----------------------------
  // UPDATE (no updating results here)
  // -----------------------------
  async update(id: number, userId: number, dto: UpdateCompletedWorkoutDto) {
    const existing = await this.prisma.completedWorkout.findFirst({
      where: { id, userId },
    });
    if (!existing) throw new NotFoundException("Completed workout not found");

    const data: any = {};
    if (dto.startedAt !== undefined) data.startedAt = new Date(dto.startedAt);
    if (dto.finishedAt !== undefined)
      data.finishedAt = dto.finishedAt ? new Date(dto.finishedAt) : null;
    if (dto.notes !== undefined) data.notes = dto.notes;

    if (dto.planId !== undefined) {
      data.plan = dto.planId
        ? { connect: { id: dto.planId } }
        : { disconnect: true };
    }

    return this.prisma.completedWorkout.update({
      where: { id },
      data,
      include: { results: true, plan: true },
    });
  }

  // -----------------------------
  // DELETE
  // -----------------------------
  async remove(id: number, userId: number) {
    const existing = await this.prisma.completedWorkout.findFirst({
      where: { id, userId },
    });
    if (!existing) throw new NotFoundException("Workout not found");

    return this.prisma.completedWorkout.delete({
      where: { id },
    });
  }
}
