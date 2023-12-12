import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async createRole(roleId: number, roleName: string) {
    const existName = await this.prisma.role.findUnique({
      where: {name : roleName},
    });
    const existId = await this.prisma.role.findUnique({
      where: {id: roleId},
    });
    if (existName || existId) {
      return "Id or Name existed";
    }
    const role = await this.prisma.role.create({
      data: {
        id: roleId,
        name: roleName,
      },
    });

    return role;
  }
  async deleteRole(roleId:number){
    const existId = await this.prisma.role.findUnique({
      where: {id: roleId},
    });
    if (!existId) {
      return `The role with id: ${roleId} not exist !`
    }
    const deleteRole = await this.prisma.role.delete({
      where: {
        id: roleId,
      },
    });
    return "ok";
  }
}