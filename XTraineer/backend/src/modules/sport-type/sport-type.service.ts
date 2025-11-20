import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSportTypeDto } from "./dto/create-sport-type.dto";
import { UpdateSportTypeDto } from "./dto/update-sport-type.dto";

@Injectable()
export class SportTypeService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateSportTypeDto) {
    return this.prisma.sportType.create({ data: dto });
  }

  findAll() {
    return this.prisma.sportType.findMany({ include: { workoutPlans: true } });
  }

  findOne(id: number) {
    return this.prisma.sportType.findUnique({
      where: { id },
      include: { workoutPlans: true },
    });
  }

  update(id: number, dto: UpdateSportTypeDto) {
    return this.prisma.sportType.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.sportType.delete({ where: { id } });
  }
}
