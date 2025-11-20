import { Module } from "@nestjs/common";
import { SportTypeService } from "./sport-type.service";
import { SportTypeController } from "./sport-type.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [SportTypeController],
  providers: [SportTypeService, PrismaService],
  exports: [SportTypeService],
})
export class SportTypeModule {}
