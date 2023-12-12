import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class OrderStatusDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;
  @IsString()
  @IsOptional()
  status: string;
}