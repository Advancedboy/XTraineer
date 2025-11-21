import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateWorkoutResultDto } from "./dto/create-workout-result.dto";
import { UpdateWorkoutResultDto } from "./dto/update-workout-result.dto";

@Injectable()
export class WorkoutResultService {
  constructor(private prisma: PrismaService) {}

  // -----------------------------
  // CREATE
  // -----------------------------
  async create(dto: CreateWorkoutResultDto) {
    const data: any = {
      exercise: { connect: { id: dto.exerciseId } },
      sets: dto.setsDone ?? null,
      reps: dto.repsPerSet ?? null,
      weight: dto.weightKg ?? null,
      duration: dto.durationSec ?? null,
      notesText: dto.notes ?? null,
    };

    if (dto.completedWorkoutId) {
      data.completedWorkout = { connect: { id: dto.completedWorkoutId } };
    }

    return this.prisma.workoutResult.create({
      data,
      include: { exercise: true, completedWorkout: true },
    });
  }

  // -----------------------------
  // UPDATE
  // -----------------------------
  async update(id: number, dto: UpdateWorkoutResultDto) {
    const existing = await this.prisma.workoutResult.findUnique({
      where: { id },
    });
    if (!existing) throw new NotFoundException("Workout result not found");

    const data: any = {};

    if (dto.exerciseId) data.exercise = { connect: { id: dto.exerciseId } };
    if (dto.completedWorkoutId !== undefined) {
      data.completedWorkout = dto.completedWorkoutId
        ? { connect: { id: dto.completedWorkoutId } }
        : { disconnect: true };
    }
    if (dto.setsDone !== undefined) data.sets = dto.setsDone;
    if (dto.repsPerSet !== undefined) data.reps = dto.repsPerSet;
    if (dto.weightKg !== undefined) data.weight = dto.weightKg;
    if (dto.durationSec !== undefined) data.duration = dto.durationSec;
    if (dto.notes !== undefined) data.notesText = dto.notes;

    return this.prisma.workoutResult.update({
      where: { id },
      data,
      include: { exercise: true, completedWorkout: true },
    });
  }

  // -----------------------------
  // GET ALL
  // -----------------------------
  findAll() {
    return this.prisma.workoutResult.findMany({
      include: { exercise: true, completedWorkout: true },
    });
  }

  // -----------------------------
  // GET ONE
  // -----------------------------
  async findOne(id: number) {
    const result = await this.prisma.workoutResult.findUnique({
      where: { id },
      include: { exercise: true, completedWorkout: true },
    });
    if (!result) throw new NotFoundException("Workout result not found");
    return result;
  }

  // -----------------------------
  // DELETE
  // -----------------------------
  async remove(id: number) {
    const existing = await this.prisma.workoutResult.findUnique({
      where: { id },
    });
    if (!existing) throw new NotFoundException("Workout result not found");

    return this.prisma.workoutResult.delete({ where: { id } });
  }
}
