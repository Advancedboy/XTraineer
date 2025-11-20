import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateWorkoutPlanDto } from "./dto/create-workout-plan.dto";
import { UpdateWorkoutPlanDto } from "./dto/update-workout-plan.dto";

@Injectable()
export class WorkoutPlanService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateWorkoutPlanDto) {
    const data: any = { ...dto };
    if (dto.ownerId) data.owner = { connect: { id: dto.ownerId } };
    data.sportType = { connect: { id: dto.sportTypeId } };
    delete data.sportTypeId;
    return this.prisma.workoutPlan.create({
      data,
      include: { exercises: true, sportType: true, owner: true },
    });
  }

  findAll() {
    return this.prisma.workoutPlan.findMany({
      include: { exercises: true, sportType: true, owner: true },
    });
  }

  findOne(id: number) {
    return this.prisma.workoutPlan.findUnique({
      where: { id },
      include: { exercises: true, sportType: true, owner: true },
    });
  }

  update(id: number, dto: UpdateWorkoutPlanDto) {
    const data: any = { ...dto };
    if (dto.sportTypeId) {
      data.sportType = { connect: { id: dto.sportTypeId } };
      delete data.sportTypeId;
    }
    if (dto.ownerId) {
      data.owner = { connect: { id: dto.ownerId } };
      delete data.ownerId;
    }
    return this.prisma.workoutPlan.update({
      where: { id },
      data,
      include: { exercises: true, sportType: true, owner: true },
    });
  }

  remove(id: number) {
    return this.prisma.workoutPlan.delete({ where: { id } });
  }
}
