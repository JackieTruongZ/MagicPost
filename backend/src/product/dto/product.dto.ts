import { IsNotEmpty, IsString } from "class-validator";


export class ProductDto {
  @IsString()
  @IsNotEmpty()
  productName : string;
}