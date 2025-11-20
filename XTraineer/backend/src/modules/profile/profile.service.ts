import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateProfileDto) {
    return this.prisma.userProfile.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  async findOne(userId: number) {
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
    });
    if (!profile) throw new NotFoundException("Profile not found");
    return profile;
  }

  async update(userId: number, dto: UpdateProfileDto) {
    return this.prisma.userProfile.update({
      where: { userId },
      data: dto,
    });
  }

  async remove(userId: number) {
    return this.prisma.userProfile.delete({ where: { userId } });
  }
}
