import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateWorkoutPlanDto } from "./dto/create-workout-plan.dto";
import { UpdateWorkoutPlanDto } from "./dto/update-workout-plan.dto";

@Injectable()
export class WorkoutPlanService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateWorkoutPlanDto) {
    return this.prisma.workoutPlan.create({ data: dto });
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
    return this.prisma.workoutPlan.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.workoutPlan.delete({ where: { id } });
  }
}
