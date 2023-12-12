import { IsNotEmpty, IsString } from "class-validator";

export class TransDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  province: string;
  @IsNotEmpty()
  @IsString()
  cityDistrict: string;
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