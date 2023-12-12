import { Controller, Post, Body, UseGuards, Patch, Delete, Param } from "@nestjs/common";
import { RoleService } from './role.service';
import { RoleDto } from "./dto";
import { JwtGuard } from "../auth/guard";
@UseGuards(JwtGuard)
@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post('add-role')
  async createRole(@Body() dto: RoleDto) {
    const { roleId, roleName } = dto;
    const role = await this.roleService.createRole(roleId, roleName);

    return role;
  }
  @Delete('delete-role/:id')
  async deleteRole(@Param('id') roleId: string) {
    const role = await this.roleService.deleteRole(parseInt(roleId));
    return role;
  }
}