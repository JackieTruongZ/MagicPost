import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class ProductDto {
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsNumber()
  @IsNotEmpty()
  mass: number;
}