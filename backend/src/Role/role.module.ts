import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoleService } from './role.service';
import { RoleController } from "./role.controller";

@Module({
  controllers : [RoleController],
  providers: [RoleService],
})
export class RoleModule {}