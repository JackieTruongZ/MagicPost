import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class OrderFindDto {
  @IsString()
  @IsNotEmpty()
  pointId: string;

  @IsOptional()
  @IsString()
  statusOrder: string;
}