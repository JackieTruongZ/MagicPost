import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RoleDto {
  @IsNumber()
  @IsNotEmpty()
  roleId? : number;
  @IsString()
  @IsNotEmpty()
  roleName? : string;
}