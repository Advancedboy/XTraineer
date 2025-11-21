import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateWorkoutProgressDto } from "./dto/create-workout-progress.dto";
import { UpdateWorkoutProgressDto } from "./dto/update-workout-progress.dto";

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateWorkoutProgressDto) {
    // dto.completedWorkoutId под условием обязательности
    if (!dto.exerciseId) throw new Error("exerciseId is required");

    const data: any = {
      exercise: { connect: { id: dto.exerciseId } },
      setsDone: dto.setsDone ?? null,
      repsPerSet: dto.repsPerSet ?? null,
      weightKg: dto.weightKg ?? null,
      durationSec: dto.durationSec ?? null,
      notes: dto.notes ?? null,
    };

    if (dto.completedWorkoutId) {
      data.completedWorkout = { connect: { id: dto.completedWorkoutId } };
    } else {
      // если completedWorkoutId обязателен по схеме, бросаем ошибку
      // throw new BadRequestException("completedWorkoutId required");
    }

    return this.prisma.workoutResult.create({ data });
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

  async update(id: number, dto: UpdateWorkoutProgressDto) {
    return this.prisma.workoutResult.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    return this.prisma.workoutResult.delete({ where: { id } });
  }
}
