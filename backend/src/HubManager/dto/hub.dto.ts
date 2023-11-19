import { IsNotEmpty, IsString } from "class-validator";

export class HubDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  address: string;
  @IsNotEmpty()
  @IsString()
  numberPhone: string;
  @IsNotEmpty()
  @IsString()
  status: string;
}