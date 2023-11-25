import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class OrderDto {
  @IsString()
  @IsNotEmpty()
  productName: string;
  @IsNumber()
  @IsNotEmpty()
  massItem: number;
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
  @IsString()
  @IsNotEmpty()
  descriptionItem: string;

  @IsString()
  @IsNotEmpty()
  senderCity: string;
  @IsString()
  @IsNotEmpty()
  senderProvince: string;
  @IsString()
  @IsNotEmpty()
  receiverCity: string;
  @IsString()
  @IsNotEmpty()
  receiverProvince: string;

  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  senderName: string;
  @IsString()
  @IsNotEmpty()
  senderNumber: string;
  @IsString()
  @IsNotEmpty()
  senderAddress: string;
  @IsString()
  @IsNotEmpty()
  senderPostCode: string;
  @IsString()
  @IsNotEmpty()
  receiverName: string;
  @IsString()
  @IsNotEmpty()
  receiverNumber: string;
  @IsString()
  @IsNotEmpty()
  receiverAddress: string;
  @IsString()
  @IsNotEmpty()
  receiverPostCode: string;
  @IsString()
  @IsNotEmpty()
  massOrder: string;
  @IsString()
  @IsNotEmpty()
  typeGoods: string;
}
